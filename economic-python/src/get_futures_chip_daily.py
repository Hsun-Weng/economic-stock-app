import requests
import db_params
import csv
from datetime import datetime

investor_code_dict = {"自營商": "D", "投信": "IT", "外資及陸資": "FI", "非法人": "RI"}
futures_chip_collection = db_params.get_mongo_db()['futures_chip']
futures_collection = db_params.get_mongo_db()['futures']

def run_get_data(date):
    url = 'https://www.taifex.com.tw/cht/3/dlFutContractsDateDown'

    ch_convert_futures_code_list = [
        {'futures_code': 'TX','commodity_id': 'TXF'}, # 大台
        {'futures_code': 'MTX','commodity_id': 'MXF'}, # 小台
        {'futures_code': 'TE','commodity_id': 'EXF'}, # 電子
        {'futures_code': 'TF','commodity_id': 'FXF'}, # 金融
        {'futures_code': 'XIF','commodity_id': 'XIF'}, # 非金電
        {'futures_code': 'GTF','commodity_id': 'GTF'} #櫃買
    ]

    for ch_convert_futures_code_dict in ch_convert_futures_code_list:
        futures_code = ch_convert_futures_code_dict['futures_code']
        commodity_id = ch_convert_futures_code_dict['commodity_id']
        post_payload = {'commodityId': commodity_id,
                'firstDate': '{date} 00:00'.format(date=date),
                'lastDate': '{date} 00:00'.format(date=date),
                'queryStartDate': date,
                'queryEndDate': date}
        post_headers = {'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent':'Mozilla/5.0'}
        res = requests.post(url, data=post_payload, headers=post_headers)

        if(res.status_code == 200):
            parse_response_text(res.text, futures_code)

# 轉換response
def parse_response_text(text_content, futures_code):
    mongo_data_dict = {}
    mongo_data_dict['futures_code'] = futures_code
    investor_chip = []
    date = None
    for futures_chip_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        futures_chip_data = format_futures_chip_data(futures_chip_raw_data)
        date = futures_chip_data.pop('date') # 取得日期刪除子物件key: date
        investor_chip.append(futures_chip_data) # 加入list
    ## 計算散戶資料
    investor_chip.append(calculate_retail_investor_data(futures_code, date, investor_chip))

    if(len(investor_chip) > 0):
        mongo_data_dict['date'] = date
        mongo_data_dict['investor_chip'] = investor_chip
        futures_chip_collection.insert_one(mongo_data_dict)
        
# 格式化原始資料
def format_futures_chip_data(futures_chip_raw_data):
    format_futures_chip_data = {}
    datetime_str = futures_chip_raw_data[0] + ' 13:45:00' # Hard code 收盤時間
    format_futures_chip_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    format_futures_chip_data['investor_code'] = investor_code_dict[futures_chip_raw_data[2]]
    format_futures_chip_data['long_lot'] = int(futures_chip_raw_data[3])
    format_futures_chip_data['long_amount'] = int(futures_chip_raw_data[4]) * 1000
    format_futures_chip_data['short_log'] = int(futures_chip_raw_data[5])
    format_futures_chip_data['short_amount'] = int(futures_chip_raw_data[6]) * 1000
    format_futures_chip_data['open_interest_long_lot'] = int(futures_chip_raw_data[9])
    format_futures_chip_data['open_interest_long_amount'] = int(futures_chip_raw_data[10]) * 1000
    format_futures_chip_data['open_interest_short_lot'] = int(futures_chip_raw_data[11])
    format_futures_chip_data['open_interest_short_amount'] = int(futures_chip_raw_data[12]) * 1000
    return format_futures_chip_data


#  補上散戶資料
def calculate_retail_investor_data(futures_code, date, corporation_chip_data):
    # 法人多單
    corporation_long_lot = sum(map(lambda futures: futures['open_interest_long_lot'], corporation_chip_data))
    # 法人空單
    corporation_short_lot = sum(map(lambda futures: futures['open_interest_short_lot'], corporation_chip_data))

    total_open_interest_lot = get_total_open_interest_lot(futures_code, date)

    retail_investor_chip_data = {}
    retail_investor_chip_data['investor_code'] = 'RI'
    retail_investor_chip_data['open_interest_long_lot'] = total_open_interest_lot - corporation_long_lot
    retail_investor_chip_data['open_interest_short_lot'] = total_open_interest_lot - corporation_short_lot

    return retail_investor_chip_data

### 查詢全市場未平倉口數
def get_total_open_interest_lot(futures_code, date):
    futures_list = list(futures_collection.find({'futures_code': futures_code, "date": {'$gte': datetime(date.year, date.month, date.day, 0, 0, 0)
    , '$lte': datetime(date.year, date.month, date.day, 23, 59, 59)}, 'open_interest_lot': {'$ne': None}}, {'open_interest_lot': 1}))
        
    if len(futures_list) > 0:
        return sum(map(lambda futures: futures['open_interest_lot'], futures_list))
    return 0
    
if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
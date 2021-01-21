import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime

## 抓取期交所期貨收盤
futures_collection = db_params.get_mongo_db()['futures']

def run_get_data(date):
    url = 'https://www.taifex.com.tw/cht/3/dlFutDataDown'

    ch_convert_futures_code_list = [
        {'futures_code': 'TX','commodity_id': 'TX'}, # 大台
        {'futures_code': 'MTX','commodity_id': 'MTX'}, # 小台
        {'futures_code': 'TE','commodity_id': 'TE'}, # 電子
        {'futures_code': 'TF','commodity_id': 'TF'}, # 金融
        {'futures_code': 'XIF','commodity_id': 'XIF'}, # 非金電
        {'futures_code': 'GTF','commodity_id': 'GTF'} #櫃買
    ]
    
    for ch_convert_futures_code_dict in ch_convert_futures_code_list:
        futures_code = ch_convert_futures_code_dict['futures_code']
        commodity_id = ch_convert_futures_code_dict['commodity_id']
        post_payload = {'down_type':1,
                'commodity_id': commodity_id,
                'commodity_id2': '',
                'queryStartDate': date,
                'queryEndDate':date}
        post_headers = {'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent':'Mozilla/5.0'}

        res = requests.post(url, data=post_payload, headers=post_headers)

        if(res.status_code == 200):
            parse_response_text(res.text, futures_code)

# 轉換response
def parse_response_text(text_content, futures_code):
    futures_data_list = []
    for futures_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        futures_data_list.append(format_futures_data(futures_raw_data, futures_code))
    
    futures_data_list = list(filter(lambda futures_data: not futures_data is None, futures_data_list))
    print(futures_data_list)
    if(len(futures_data_list) > 0):
        futures_collection.insert_many(futures_data_list)

# 轉換價格資料型態至float
def convert_price_text(price_text):
    price = None
    try:
        price = float(price_text)
    except ValueError:
        pass
    return price

# 轉換成交量資料型態至float
def convert_volume_value(volume_text):
    volume = None
    try:
        volume = int(volume_text)
    except ValueError:
        pass
    return volume

#過濾掉不新增的資料
def validate_raw_data(futures_raw_data):
    transaction_time = futures_raw_data[17] # 交易時段
    contract_date = futures_raw_data[2] # 契約月份or週
    if transaction_time != "一般": #只要日盤資料
        return False
    if '/' in contract_date: # ?
        return False
    return True

# 格式化原始資料
def format_futures_data(futures_raw_data, futures_code):
    if not validate_raw_data(futures_raw_data):
        return None

    futures_data = {}
    datetime_str = futures_raw_data[0] + ' 13:45:00' # Hard code 收盤時間
    futures_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    futures_data['futures_code'] = futures_code
    futures_data['contract_date'] = futures_raw_data[2].strip()
    futures_data['open'] = convert_price_text(futures_raw_data[3])
    futures_data['high'] = convert_price_text(futures_raw_data[4])
    futures_data['low'] = convert_price_text(futures_raw_data[5])
    futures_data['close'] = convert_price_text(futures_raw_data[6])
    futures_data['volume'] = convert_volume_value(futures_raw_data[9])
    futures_data['open_interest_lot'] = convert_volume_value(futures_raw_data[11])
    try:
        previous_close = get_previous_close(futures_data['futures_code'], futures_data['contract_date'], futures_data['date'])
        futures_data['change'] = round(futures_data['close'] - previous_close, 2)
        futures_data['change_percent'] = round(futures_data['change'] / previous_close, 4)
    except:
        futures_data['change'] = None
        futures_data['change_percent'] = None

    return futures_data

### 查詢最近一日的收盤價
def get_previous_close(futures_code, contract_date, current_date):
    close_list = list(futures_collection.find({'futures_code': futures_code, 'contract_date': contract_date, 'date': {'$lt': current_date}, 'close': {'$ne': None}}, {'close': 1})
        .sort([('date', -1)])
        .limit(1))
    if len(close_list) > 0:
        return close_list[0]['close']
    return None

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
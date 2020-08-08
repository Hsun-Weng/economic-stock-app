import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime

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
    mongo_data_list = []
    futures_data_list = []
    for futures_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        futures_data_list.append(format_futures_data(futures_raw_data, futures_code))

    if(len(futures_data_list) > 0):
        # 過濾
        mongo_data_list = list(filter(lambda futures_data: filter_futures_data(futures_data) ,futures_data_list))
        # 移除交易時段(lazy execution故加上list)
        list(map(lambda futures_data: futures_data.pop("transaction_time"), mongo_data_list))
        insert_futures_data(mongo_data_list)
        

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
def filter_futures_data(futures_data):
    if futures_data["transaction_time"] != "一般": #只要日盤資料
        return False
    if '/' in futures_data["contract_date"]: # ?
        return False
    return True

# 格式化原始資料
def format_futures_data(futures_raw_data, futures_code):
    format_futures_data = {}
    datetime_str = futures_raw_data[0] + ' 13:45:00' # Hard code 收盤時間
    format_futures_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    format_futures_data['futures_code'] = futures_code
    format_futures_data['contract_date'] = futures_raw_data[2]
    format_futures_data['open'] = convert_price_text(futures_raw_data[3])
    format_futures_data['high'] = convert_price_text(futures_raw_data[4])
    format_futures_data['low'] = convert_price_text(futures_raw_data[5])
    format_futures_data['close'] = convert_price_text(futures_raw_data[6])
    format_futures_data['volume'] = convert_volume_value(futures_raw_data[9])
    format_futures_data['open_interest_lot'] = convert_volume_value(futures_raw_data[11])
    format_futures_data['transaction_time'] = futures_raw_data[17]
    return format_futures_data

def insert_futures_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    stock_index_collection = db['futures']
    stock_index_collection.insert_many(data)

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime

def run_get_data(date):
    url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data'

    res = requests.get(url)

    if(res.status_code == 200):
        parse_response_text(date, res.text)

# 轉換response
def parse_response_text(date, text_content):
    mongo_data_list = []
    for stock_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        mongo_data_list.append(format_stock_data(date, stock_raw_data))

    if(len(mongo_data_list) > 0):
        insert_stock_data(mongo_data_list)
        
# 轉換價格資料型態至float
def convert_price_text(price_text):
    price = None
    try:
        price = float(price_text.replace(',', ''))
    except ValueError:
        pass
    return price

def convert_change_text(change_text):
    change = None
    try:
        change = float(change_text.replace('+', '').replace('X', '').replace(',', ''))
    except ValueError:
        pass
    return change

# 轉換成交量資料型態至float
def convert_volume_value(volume_text):
    volume = None
    try:
        volume = int(volume_text.replace(',', ''))
    except ValueError:
        pass
    return volume

# 格式化原始資料
def format_stock_data(date, stock_raw_data):
    format_stock_data = {}
    datetime_str = date + ' 14:30:00' # Hard code 收盤時間(含零股)
    format_stock_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    format_stock_data['stock_code'] = stock_raw_data[0]
    format_stock_data['volume'] = convert_volume_value(stock_raw_data[2])
    format_stock_data['close'] = convert_price_text(stock_raw_data[7])
    
    if format_stock_data['volume'] > 0 and format_stock_data['close'] > 0: # 成交量為0或收盤價為0價格全填null(公開資料是為0)
        format_stock_data['open'] = convert_price_text(stock_raw_data[4])
        format_stock_data['high'] = convert_price_text(stock_raw_data[5])
        format_stock_data['low'] = convert_price_text(stock_raw_data[6])

        format_stock_data['change'] = convert_change_text(stock_raw_data[8])
        ## 前一天收盤價
        previous_close = format_stock_data['close'] - format_stock_data['change']
        format_stock_data['change_percent'] = round(format_stock_data['change'] / previous_close, 4)
    else: 
        format_stock_data['open'] = None
        format_stock_data['high'] = None
        format_stock_data['low'] = None
        format_stock_data['close'] = None
        format_stock_data['change'] = None
        format_stock_data['change_percent'] = None

    return format_stock_data

def insert_stock_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    stock_index_collection = db['stock']
    stock_index_collection.insert_many(data)

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
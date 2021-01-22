import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime
from multiprocessing.pool import ThreadPool

## 抓取證交所收盤行情
stock_collection = db_params.get_mongo_db()['stock']

def run_get_data(date):
    url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data'

    res = requests.get(url)

    if(res.status_code == 200):
        parse_response_text(date, res.text)

# 轉換response
def parse_response_text(date, text_content):
    pool = ThreadPool(4)

    task_list = []
    for stock_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        task_list.append(pool.apply_async(format_stock_data, args=(date, stock_raw_data)))

    pool.close()
    pool.join()

    mongo_data_list = [task.get() for task in task_list]
    if(len(mongo_data_list) > 0):
        stock_collection.insert_many(mongo_data_list)
        
# 轉換價格資料型態至float
def convert_price_text(price_text):
    price = None
    try:
        price = float(price_text.replace(',', ''))
    except ValueError:
        price = 0
    return price

def convert_change_text(change_text):
    change = None
    try:
        change = float(change_text.replace('+', '').replace('X', '').replace(',', ''))
    except ValueError:
        change = 0
    return change

# 轉換成交量資料型態至float
def convert_volume_value(volume_text):
    volume = None
    try:
        volume = int(volume_text.replace(',', ''))
    except ValueError:
        volume = 0
    return volume

# 格式化原始資料
def format_stock_data(date, stock_raw_data):
    stock_data = {}
    datetime_str = date + ' 14:30:00' # Hard code 收盤時間(含零股)
    stock_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    stock_data['stock_code'] = stock_raw_data[0]
    stock_data['volume'] = convert_volume_value(stock_raw_data[2])
    stock_data['close'] = convert_price_text(stock_raw_data[7])

    if stock_data['volume'] > 0: # 成交量為0價格全填null
        stock_data['open'] = convert_price_text(stock_raw_data[4])
        stock_data['high'] = convert_price_text(stock_raw_data[5])
        stock_data['low'] = convert_price_text(stock_raw_data[6])

        stock_data['change'] = convert_change_text(stock_raw_data[8])
        ## 前一日收盤價
        try:
            previous_close = get_previous_close(stock_data['stock_code'], stock_data['date'])
            stock_data['change'] = round(stock_data['close'] - previous_close, 2)
            stock_data['change_percent'] = round(stock_data['change'] / previous_close, 4)
        except:
            stock_data['change'] = None
            stock_data['change_percent'] = None
    else: 
        stock_data['open'] = None
        stock_data['high'] = None
        stock_data['low'] = None
        stock_data['close'] = None
        stock_data['change'] = None
        stock_data['change_percent'] = None

    return stock_data

def get_previous_close(stock_code, date):
    close_list = list(stock_collection.find({'stock_code': stock_code, 'date': {'$lt': date}, 'close': {'$ne': None}}, {'close': 1})
        .sort([('date', -1)])
        .limit(1))
    if len(close_list) > 0:
        return close_list[0]['close']
    return None

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
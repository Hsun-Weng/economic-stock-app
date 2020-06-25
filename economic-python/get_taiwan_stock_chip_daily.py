import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime

def run_get_data(date):
    format_date_str = datetime.strptime(date, "%Y/%m/%d").strftime('%Y%m%d')
    res = requests.get('https://www.twse.com.tw/fund/T86?response=csv&date={}&selectType=ALLBUT0999'.format(format_date_str))

    if(res.status_code == 200):
        parse_response_text(date, res.text)

# 轉換response
def parse_response_text(date, text_content):
    mongo_data_list = []
    for stock_chip_raw_data in csv.reader(text_content.splitlines()[2:], quotechar='"'): # 跳過第一、二行標題
        if(len(stock_chip_raw_data) > 1): # 跳過結尾說明
            mongo_data_list.append(format_stock_chip_data(date, stock_chip_raw_data))

    if(len(mongo_data_list) > 0):
        insert_stock_chip_data(mongo_data_list)
        
# 格式化原始資料
def format_stock_chip_data(date, stock_chip_raw_data):
    format_stock_chip_data = {}
    investor_chip = []

    datetime_str = date + ' 13:30:00' # Hard code 收盤時間
    format_stock_chip_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    format_stock_chip_data['stock_code'] = format_stock_code(stock_chip_raw_data[0])

    fi_chip_dict = {} # 外資
    fi_chip_dict['investor_code'] = 'FI'
    fi_chip_dict['long_share'] = convert_numeric_text(stock_chip_raw_data[2])
    fi_chip_dict['short_share'] = convert_numeric_text(stock_chip_raw_data[3])

    it_chip_dict = {} # 投信
    it_chip_dict['investor_code'] = 'IT'
    it_chip_dict['long_share'] = convert_numeric_text(stock_chip_raw_data[8])
    it_chip_dict['short_share'] = convert_numeric_text(stock_chip_raw_data[9])

    d_chip_dict = {} # 自營商
    d_chip_dict['investor_code'] = 'D'
    d_chip_dict['long_share'] = convert_numeric_text(stock_chip_raw_data[11])
    d_chip_dict['short_share'] = convert_numeric_text(stock_chip_raw_data[12])

    investor_chip.append(fi_chip_dict)
    investor_chip.append(it_chip_dict)
    investor_chip.append(d_chip_dict)

    format_stock_chip_data['investor_chip'] = investor_chip

    # 合計淨額
    format_stock_chip_data['net_share'] = convert_numeric_text(stock_chip_raw_data[18])

    return format_stock_chip_data

# 轉換資料型態至int
def convert_numeric_text(text):
    numeric = None
    try:
        numeric = int(text.replace(',', ''))
    except ValueError:
        pass
    return numeric

# 轉換正確股號(去 = & 雙引號)
def format_stock_code(stock_code_text):
    return stock_code_text.replace('=', '').replace('"', '')

def insert_stock_chip_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    taiwan_stock_index_collection = db['taiwan_stock_chip']
    taiwan_stock_index_collection.insert_many(data)

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日
    run_get_data(current_time.strftime("%Y/%m/%d"))
    
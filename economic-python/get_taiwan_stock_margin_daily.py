import requests
import db_params
from mysql.connector import Error
import csv
from datetime import datetime, timedelta

def run_get_data(date):
    format_date_str = datetime.strptime(date, "%Y/%m/%d").strftime('%Y%m%d')
    res = requests.get('https://www.twse.com.tw/exchangeReport/MI_MARGN?response=csv&date={}&selectType=ALL'.format(format_date_str))

    if(res.status_code == 200):
        parse_response_text(date, res.text)

# 轉換response
def parse_response_text(date, text_content):
    taiwan_index_margin_data = {}
    taiwan_index_margin_raw_data_list = []
    taiwan_stock_margin_data_list = []
    for stock_margin_raw_data in csv.reader(text_content.splitlines()[2:5], quotechar='"'): # 統計資料 raw
        taiwan_index_margin_raw_data_list.append(stock_margin_raw_data)

    # 大盤統計資券數據
    taiwan_index_margin_data = format_stock_index_margin_data(date, taiwan_index_margin_raw_data_list)
    print(taiwan_index_margin_data)

    for stock_margin_raw_data in csv.reader(text_content.splitlines()[8:], quotechar='"'): # 第8行股票明細
        if(len(stock_margin_raw_data) > 2): # 跳過結尾說明
            taiwan_stock_margin_data_list.append(format_stock_margin_data(date, stock_margin_raw_data))

    if(len(mongo_data_list) > 0):
        insert_stock_margin_data(taiwan_stock_margin_data_list)
        insert_stock_index_margin_data(taiwan_index_margin_data)

# 格式化大盤資券
def format_stock_index_margin_data(date, stock_margin_raw_data):
    format_stock_margin_index_data = {}
    format_stock_margin_index_data['index_code'] = 'TAIEX' # hard code 加權指數代號
    long_raw_data = stock_margin_raw_data[0]
    short_raw_data = stock_margin_raw_data[1]
    amount_raw_data = stock_margin_raw_data[1]

    # 融資買進
    margin_buy_long_share = convert_numeric_text(long_raw_data[1])
    # 融資賣出
    margin_sell_long_share = convert_numeric_text(long_raw_data[2])
    # 現金償還
    margin_repay_long_share = convert_numeric_text(long_raw_data[3])

    # 融資變動
    format_stock_margin_index_data['margin_long_share'] = margin_buy_long_share - ( margin_sell_long_share + margin_repay_long_share )

    # 融資餘額
    format_stock_margin_index_data['margin_long_amount'] = convert_numeric_text(amount_raw_data[5])

    # 融券買進
    margin_buy_short_share = convert_numeric_text(short_raw_data[1])
    # 融券賣出
    margin_sell_short_share = convert_numeric_text(short_raw_data[2])
    # 現券償還
    margin_repay_short_share = convert_numeric_text(short_raw_data[3])

    # 融券變動
    format_stock_margin_index_data['margin_short_share'] = margin_sell_short_share - ( margin_buy_short_share + margin_repay_short_share )

    # 融券餘額
    format_stock_margin_index_data['margin_short_amount'] = convert_numeric_text(short_raw_data[5])

    return format_stock_margin_index_data


# 格式化原始資料
def format_stock_margin_data(date, stock_margin_raw_data):
    format_stock_margin_data = {}

    datetime_str = date + ' 13:30:00' # Hard code 收盤時間
    format_stock_margin_data['date'] = datetime.strptime(datetime_str, '%Y/%m/%d %H:%M:%S')
    format_stock_margin_data['stock_code'] = format_stock_code(stock_margin_raw_data[0])

    # 融資買進
    margin_buy_long_share = convert_numeric_text(stock_margin_raw_data[2])
    # 融資賣出
    margin_sell_long_share = convert_numeric_text(stock_margin_raw_data[3])
    # 現金償還
    margin_repay_long_share = convert_numeric_text(stock_margin_raw_data[4])

    # 融資變動
    format_stock_margin_data['margin_long_share'] = margin_buy_long_share - ( margin_sell_long_share + margin_repay_long_share )

    # 融資餘額
    format_stock_margin_data['margin_long_amount'] = convert_numeric_text(stock_margin_raw_data[6])

    # 融券買進
    margin_buy_short_share = convert_numeric_text(stock_margin_raw_data[8])
    # 融券賣出
    margin_sell_short_share = convert_numeric_text(stock_margin_raw_data[9])
    # 現券償還
    margin_repay_short_share = convert_numeric_text(stock_margin_raw_data[10])

    # 融券變動
    format_stock_margin_data['margin_short_share'] = margin_sell_short_share - ( margin_buy_short_share + margin_repay_short_share )

    # 融券餘額
    format_stock_margin_data['margin_short_amount'] = convert_numeric_text(stock_margin_raw_data[12])

    # 資券互抵
    format_stock_margin_data['margin_day_amount'] = convert_numeric_text(stock_margin_raw_data[14])

    return format_stock_margin_data

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

def insert_stock_margin_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    taiwan_stock_index_collection = db['taiwan_stock_margin']
    taiwan_stock_index_collection.insert_many(data)

def insert_stock_index_margin_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    taiwan_stock_index_collection = db['taiwan_stock_index_margin']
    taiwan_stock_index_collection.insert_one(data)

def get_date_range():
    import time
    start_date = datetime(2020, 3, 27)
    end_date = datetime(2020, 7, 17)
    delta = timedelta(days=1)

    for i in range((end_date - start_date).days):
        current_time = start_date + i*delta
        if current_time.weekday() not in [5, 6]:
            try:
                run_get_data(current_time.strftime("%Y/%m/%d"))
                print(current_time.strftime("%Y/%m/%d") + ' Finish, Sleep 7 seconds.')
                time.sleep(7)
            except:
                print(current_time.strftime("%Y/%m/%d") + ' Error')

if __name__ == "__main__":
    current_time = datetime.now()
    # 當日 
    # run_get_data(current_time.strftime("%Y/%m/%d"))
    # batch 補進
    get_date_range()
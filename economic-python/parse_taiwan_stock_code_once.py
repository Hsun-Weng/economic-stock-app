import requests
import db_params
import mysql.connector
import csv
from datetime import datetime

def run_get_data():
    url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data'

    res = requests.get(url)

    if(res.status_code == 200):
        parse_response_text(res.text)

# 轉換response
def parse_response_text(text_content):
    mysql_data_list = []
    for stock_raw_data in csv.reader(text_content.splitlines()[1:]): # 跳過第一行標題
        mysql_data_list.append(format_stock_data(stock_raw_data))

    if(len(mysql_data_list) > 0):
        insert_stock_data(mysql_data_list)
        
# 格式化原始資料
def format_stock_data(stock_raw_data):
    format_stock_data = {}
    format_stock_data['stock_code'] = stock_raw_data[0]
    format_stock_data['stock_name'] = stock_raw_data[1]

    return format_stock_data

def insert_stock_data(data):
    mariadb_connection = db_params.get_mariadb_connection()
    sql_command = "INSERT INTO taiwan_stock (stock_code, stock_name) VALUES (%s, %s)"
    cursor = mariadb_connection.cursor()
    try:
        for stock_data in data:
            values = (stock_data["stock_code"], stock_data["stock_name"])
            cursor.execute(sql_command, values)
        mariadb_connection.commit()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
    except: 
        print('Error Occured')
    finally:
        cursor.close()
        mariadb_connection.close()
        
if __name__ == "__main__":
    run_get_data()
    
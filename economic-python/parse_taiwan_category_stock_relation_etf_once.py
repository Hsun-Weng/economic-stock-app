import requests
import db_params
import mysql.connector
import csv
from datetime import datetime

def run_parse_data():
    data = './data/etf.csv'

    csv_file = open(data, "r")
    parse_text(csv_file.read())

# 轉換response
def parse_text(text_content):
    mysql_data_list = []
    stock_data = get_stock()
    for category_raw_data in csv.reader(text_content.splitlines(), delimiter='\t'):
        mysql_data = format_category_stock_data(stock_data, category_raw_data)
        if not (mysql_data is None):
            mysql_data_list.append(mysql_data)

    if(len(mysql_data_list) > 0):
        insert_category_stock_data(mysql_data_list)
        
# 格式化原始資料
def format_category_stock_data(stock_data, category_raw_data):
    stock_code = category_raw_data[0].strip()
    stock_list = list(filter(lambda data: data['stock_code'] == stock_code, stock_data))
    if len(stock_list) > 0:
        format_category_stock_data = {}
        format_category_stock_data['category_id'] = 31
        format_category_stock_data['stock_id'] = stock_list[0]['stock_id']
        return format_category_stock_data    
    return None    

def get_stock():
    mariadb_connection = db_params.get_mariadb_connection()
    sql_command = "SELECT stock_id, stock_code FROM taiwan_stock"
    cursor = mariadb_connection.cursor()
    stock_data = []
    try:
        cursor.execute(sql_command)
        for result in cursor.fetchall():
            data = {}
            data["stock_id"] = result[0]
            data["stock_code"] = result[1]
            stock_data.append(data)

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
    except: 
        print('Error Occured')
    finally:
        cursor.close()
        mariadb_connection.close()
    return stock_data

def insert_category_stock_data(data):
    mariadb_connection = db_params.get_mariadb_connection()
    sql_command = "INSERT INTO category_stock (category_id, stock_id) VALUES (%s, %s)"
    cursor = mariadb_connection.cursor()
    try:
        for stock_data in data:
            values = (stock_data["category_id"], stock_data["stock_id"])
            cursor.execute(sql_command, values)
        mariadb_connection.commit()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
    except: 
        print('Error Occured at insert statemnet')
    finally:
        cursor.close()
        mariadb_connection.close()
        
if __name__ == "__main__":
    run_parse_data()
    
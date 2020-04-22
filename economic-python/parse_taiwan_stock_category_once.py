import requests
import db_params
import mysql.connector
import csv
from datetime import datetime

def run_parse_data():
    data = './data/category.csv'

    csv_file = open(data, "r")
    parse_text(csv_file.read())

# 轉換response
def parse_text(text_content):
    mysql_data_list = []
    for category_raw_data in csv.reader(text_content.splitlines()):
        mysql_data_list.append(format_category_data(category_raw_data))

    if(len(mysql_data_list) > 0):
        insert_category_data(mysql_data_list)
        
# 格式化原始資料
def format_category_data(category_raw_data):
    format_category_data = {}
    format_category_data['category_code'] = category_raw_data[0]
    format_category_data['category_name'] = category_raw_data[1]

    return format_category_data

def insert_category_data(data):
    mariadb_connection = db_params.get_mariadb_connection()
    sql_command = "INSERT INTO taiwan_stock_category (category_code, category_name) VALUES (%s, %s)"
    cursor = mariadb_connection.cursor()
    try:
        for stock_data in data:
            values = (stock_data["category_code"], stock_data["category_name"])
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
    run_parse_data()
    
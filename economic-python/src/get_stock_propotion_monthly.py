import requests
import chardet
import pyquery
import db_params
import mysql.connector

from datetime import datetime


def run_get_data():
    url = 'https://www.taifex.com.tw/cht/9/futuresQADetail'

    res = requests.get(url)

    if(res.status_code == 200):
        parse_response_text(detect_text(res.content))

def parse_response_text(text_content):
    stock_proportion_list = []
    current_time = datetime.now()

    html_items = pyquery.PyQuery(text_content)

    rows = list(html_items('table tr').items())

    rows = rows[1:] # 跳過首行標題

    for row in rows:
        cell_list = list(row('td').items())

        stock_code = cell_list[1].text().strip()
        if stock_code != '':
            format_stock_proportion_data = {}
            format_stock_proportion_data['stock_code'] = stock_code
            format_stock_proportion_data['rank'] = convert_rank_value(cell_list[0].text().strip())
            format_stock_proportion_data['proportion'] = convert_proportion_text(cell_list[3].text().strip())
            format_stock_proportion_data['create_time'] = current_time

            stock_proportion_list.append(format_stock_proportion_data)

        stock_code = cell_list[5].text().strip()
        if stock_code != '':
            format_stock_proportion_data = {}
            format_stock_proportion_data['stock_code'] = stock_code
            format_stock_proportion_data['rank'] = convert_rank_value(cell_list[4].text().strip())
            format_stock_proportion_data['proportion'] = convert_proportion_text(cell_list[7].text().strip())
            format_stock_proportion_data['create_time'] = current_time

            stock_proportion_list.append(format_stock_proportion_data)

    upsert_stock_proportion_data(stock_proportion_list)

# 轉換比重(移除%、轉float)
def convert_proportion_text(proportion_text):
    proportion = None
    try:
        proportion = round(float(proportion_text.replace('%', '')), 4)
    except ValueError:
        pass
    return proportion

# 轉換排名型態至int
def convert_rank_value(rank_text):
    rank = None
    try:
        rank = int(rank_text.replace(',', ''))
    except ValueError:
        pass
    return rank

# 新增或修改比重資料
def upsert_stock_proportion_data(data):
    mariadb_connection = db_params.get_mariadb_connection()
    delete_all_command = "DELETE FROM stock_proportion"
    sql_command = "INSERT INTO stock_proportion (rank, stock_code, proportion, create_time) VALUES (%s, %s, %s, %s)"

    mariadb_connection.autocommit = False
    cursor = mariadb_connection.cursor()
    try:
        cursor.execute(delete_all_command)
        for stock_proportion in data:
            values = (stock_proportion["rank"], stock_proportion["stock_code"], stock_proportion["proportion"], stock_proportion["create_time"])
            cursor.execute(sql_command, values)
        mariadb_connection.commit()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        mariadb_connection.rollback()
    except Exception as e:
        print('Error Occured at insert statemnet')
        mariadb_connection.rollback()
    finally:
        cursor.close()
        mariadb_connection.close()

# 判斷html編碼並回傳
def detect_text(res_content):
    text_content = None
    detection = chardet.detect(res_content)
    try:
        if detection['confidence'] > 0.5:
            if detection['encoding'] == 'big-5':
                text_content = res_content.decode('big5')
            else:
                text_content = res_content.decode(detection['encoding'])
        else:
            text_content = res_content.content.decode('utf-8')
    except:
        pass

    return text_content

if __name__ == "__main__":
    run_get_data()
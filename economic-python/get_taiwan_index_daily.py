import requests
from datetime import date, datetime
import db_params

## 抓取證交所大盤指數收盤

def run_get_data():
    res = requests.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t00.tw|tse_TW50.tw|tse_t003.tw|tse_t13.tw|tse_t17.tw')

    ch_convert_index_code_dict = {'t00.tw': 'TAIEX', 'TW50.tw': 'TW50','t003.tw': 'XIF', 't13.tw': 'TWFE', 't17.tw': 'TWFF'}

    mongo_data = []
    if res.status_code == 200:
        data = res.json()

        msgs = data['msgArray']

        for msg in msgs:
            index_data ={}
            index_code = ch_convert_index_code_dict[msg['ch']]
            datetime_str = msg['d'] + ' ' + msg['t']
            index_data['index_code'] = index_code
            index_data['date'] = datetime.strptime(datetime_str, '%Y%m%d %H:%M:%S')
            index_data['open'] = float(msg['o'])
            index_data['low'] = float(msg['l'])
            index_data['high'] = float(msg['h'])
            index_data['close'] = float(msg['z'])
            if(index_code == 'TAIEX'):
                index_data['volume'] = int(msg['v']) * 1000000 #單位為百萬
            
            mongo_data.append(index_data)

        insert_index_data(mongo_data)
        

def insert_index_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    taiwan_stock_index_collection = db['taiwan_stock_index']
    taiwan_stock_index_collection.insert_many(data)

if __name__ == "__main__":
    run_get_data()
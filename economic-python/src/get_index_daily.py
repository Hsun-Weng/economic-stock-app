import requests
from datetime import date, datetime
import db_params

## 抓取證交所大盤指數收盤
stock_index_collection = db_params.get_mongo_db()['stock_index']

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
            if(index_code == 'TAIEX'): ##只有大盤有成交量資訊
                index_data['volume'] = int(msg['v']) * 1000000 #單位為百萬
            try:
                previous_close = get_previous_close(index_data['index_code'], index_data['date'])
                index_data['change'] = round(index_data['close'] - previous_close, 2)
                index_data['change_percent'] = round(index_data['change'] / previous_close, 4)
            except:
                index_data['change'] = None
                index_data['change_percent'] = None
            
            mongo_data.append(index_data)

        stock_index_collection.insert_many(mongo_data)

### 查詢最近一日的收盤價
def get_previous_close(index_code, current_date):
    close_list = list(stock_index_collection.find({'index_code': index_code, 'date': {'$lt': current_date}, 'close': {'$ne': None}}, {'close': 1})
        .sort([('date', -1)])
        .limit(1))
    if len(close_list) > 0:
        return close_list[0]['close']
    return None

if __name__ == "__main__":
    run_get_data()
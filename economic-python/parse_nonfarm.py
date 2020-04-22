import csv, datetime, pymongo
import db_params

date_format_str = '%Y-%m-%d'

def parse_nonfarm(file):
    date_format_str = '%Y-%m-%d'
    with open(file, newline='') as data_csv:
        rows = csv.reader(data_csv) 
        next(rows) # skip header line
        for row in rows:
            data={}
            data['data_id'] = 1
            data['country_code'] = 'USA'
            data['date'] = datetime.datetime.strptime(row[0], date_format_str)
            value={}
            value['chg'] = int(row[1]) # modify this line
            data['value'] = value
            upsert_economic_data(data)
    
def upsert_economic_data(data):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    economic_data_collection = db['economic_data']

    economic_data_collection.update_one({'date': data['date'],
     'data_id': data['data_id'], 'country_code': data['country_code']},
     {'$set': {'value.chg': data['value']['chg']}}, upsert= True) # append data to value child
    #   {'$set': data}, upsert= True) # create if no exists

if __name__ == "__main__":
    file = './nonfarm_data/usa_nonfarm_chg.csv'
    parse_nonfarm(file)

import csv, datetime, pymongo
import db_params

date_format_str = '%Y-%m-%d'

def parse_nonfarm(file):
    date_format_str = '%Y-%m-%d'
    data_list = []
    with open(file, newline='') as data_csv:
        rows = csv.reader(data_csv) 
        next(rows) # skip header line
        for row in rows:
            data={}
            data['data_code'] = 'NONFARM'
            data['country_code'] = 'USA'
            data['date'] = datetime.datetime.strptime(row[0], date_format_str)
            data['value'] = int(row[1])
            data_list.append(data)
        insert_economic_data_list(data_list)
    
def insert_economic_data_list(data_list):
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    economic_data_collection = db['economic_data']

    economic_data_collection.insert_many(data_list)

if __name__ == "__main__":
    file = './nonfarm_data/usa_nonfarm.csv'
    parse_nonfarm(file)

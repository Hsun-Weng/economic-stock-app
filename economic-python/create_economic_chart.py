import db_params

def create_collection(data_id, country_code, data_name):
    data_info = {}
    data_info['data_id'] = data_id
    data_info['country_code'] = country_code
    data_info['data_name'] = data_name
    data_info['chart'] = {}
    mongo_client = db_params.get_mongo_client()
    db = mongo_client['economic']
    economic_chart_collection = db['economic_chart']
    economic_chart_collection.insert_one(data_info)

if __name__ == '__main__':
    create_collection(1, 'USA', 'All Employees, Total Nonfarm (CHG)')

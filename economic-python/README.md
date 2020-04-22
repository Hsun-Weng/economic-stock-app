implement db_params.py

```py
import pymongo
import mysql.connector

mongo_url = "mongodb://{host}:{port}/"
mongo_username = "{username}"
mongo_password = "{password}"

mariadb_host = "{host}"
mariadb_port = "{port}"
mariadb_database = "{database}"
mariadb_username = "{username}"
mariadb_password = "{password}"

def get_mongo_client():
    return pymongo.MongoClient(mongo_url, username=mongo_username, password=mongo_password)

def get_mariadb_connection():
    connection = mysql.connector.connect(host=mariadb_host,port=mariadb_port,
        database=mariadb_database,user=mariadb_username,password=mariadb_password)
    return connection
```
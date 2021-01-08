
## Architecture
![](images/architecture.png)
## RDB ERD
![](images/mariadb_erd.png)
## MongoDB Collections
![](images/mongo_erd.png)

## economic-python crontab排程
``` 
0 19 * * 1-5 . python get_stock_daily.py
50 14 * * 1-5 . python get_index_daily.py
50 14 * * 1-5 . python get_futures_daily.py
0 15 * * 1-5 . python get_futures_chip_daily.py
0 19 * * 1-5 . python get_stock_chip_daily.py
40 20 * * 1-5 . python get_stock_margin_daily.py
0 3 1 * * . python get_stock_propotion_monthly.py
```
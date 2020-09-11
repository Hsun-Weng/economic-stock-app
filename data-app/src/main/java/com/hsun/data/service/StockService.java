package com.hsun.data.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.entity.Stock;

public interface StockService {
    List<Stock> getStockByCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
    List<Map<String, Object>> getBatchLatestPriceList(List<String> stockCodeList);
}

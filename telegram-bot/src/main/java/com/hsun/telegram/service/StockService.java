package com.hsun.telegram.service;

import java.util.Map;

public interface StockService {
    Map<String, Object> findStockLatestPrice(String stockCode);
}

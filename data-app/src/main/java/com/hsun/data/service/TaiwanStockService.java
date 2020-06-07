package com.hsun.data.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.entity.TaiwanStock;

public interface TaiwanStockService {
    List<TaiwanStock> getTaiwanStockByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
    List<Map<String, Object>> getBatchLatestPriceList(List<String> stockCodeList);
}

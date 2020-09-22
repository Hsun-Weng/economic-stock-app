package com.hsun.data.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface StockService {
    List<Stock> getStockByCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
    List<Stock> getBatchLatestPriceList(List<String> stockCodeList);
    Page<Stock> getStockSortedPage(PageRequest pageRequest);
}

package com.hsun.data.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.bean.StockIndexPriceBean;
import com.hsun.data.entity.StockIndex;

public interface StockIndexService {
    List<StockIndexPriceBean> getStockIndexByCodeAndDateBetween(String indexCode, LocalDate startDate, LocalDate endDate);
    StockIndexPriceBean getStockIndexLatestPrice(String indexCode);
    List<StockIndexPriceBean> getBatchLatestPriceList(List<String> indexCodeList);
}

package com.hsun.data.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.bean.StockIndexPriceBean;
import com.hsun.data.entity.StockIndex;

public interface StockIndexService {
    List<StockIndexPriceBean> getStockIndexByCodeAndDateBetween(String indexCode, Date startDate, Date endDate);
    List<StockIndexPriceBean> getBatchLatestPriceList(List<String> indexCodeList);
}

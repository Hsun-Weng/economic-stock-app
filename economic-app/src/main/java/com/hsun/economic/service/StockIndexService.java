package com.hsun.economic.service;

import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.StockIndexBean;

import java.time.LocalDate;
import java.util.List;

public interface StockIndexService {
    List<StockIndexBean> getStockIndexList();
    List<PriceBean> getPriceList(String indexCode, LocalDate startDate, LocalDate endDate);
}

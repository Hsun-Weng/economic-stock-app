package com.hsun.economic.service;

import com.hsun.economic.bean.*;

import java.time.LocalDate;
import java.util.List;

public interface StockService {
    List<StockBean> getStockList();
    StockBean getStock(String stockCode);
    PageInfoBean<StockPriceBean> getStockSortedPage(String sortColumn, Integer page, Integer size, String direction);
    List<PriceBean> getPriceList(String stockCode, LocalDate startDate, LocalDate endDate);
    List<StockChipBean> getChipList(String stockCode, LocalDate startDate, LocalDate endDate);
    List<StockMarginBean> getMarginList(String stockCode, LocalDate startDate, LocalDate endDate);
}

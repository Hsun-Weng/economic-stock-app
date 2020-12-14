package com.hsun.economic.service;

import com.hsun.economic.bean.PageInfoBean;
import com.hsun.economic.bean.StockBean;
import com.hsun.economic.bean.StockPriceBean;

import java.util.List;

public interface StockService {
    List<StockBean> getStockList();
    PageInfoBean<StockPriceBean> getStockSortedPage(String sortColumn, Integer page, Integer size, String direction);
}

package com.hsun.data.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.bean.StockPriceBean;
import com.hsun.data.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface StockService {
    List<StockPriceBean> getStockPriceList(String stockCode, Date startDate, Date endDate);
    StockPriceBean getStockLatestPrice(String stockCode);
    List<StockPriceBean> getBatchStockLatestPriceList(List<String> stockCodeList);
    Page<StockPriceBean> getStockSortedPage(PageRequest pageRequest);
}

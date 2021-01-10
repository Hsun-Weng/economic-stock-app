package com.hsun.data.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.hsun.data.bean.PageInfoBean;
import com.hsun.data.bean.StockPriceBean;
import com.hsun.data.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface StockService {
    List<StockPriceBean> getStockPriceList(String stockCode, LocalDate startDate, LocalDate endDate);
    StockPriceBean getStockLatestPrice(String stockCode);
    List<StockPriceBean> getBatchStockLatestPriceList(List<String> stockCodeList);
    PageInfoBean<StockPriceBean> getStockSortedPage(PageRequest pageRequest);
}

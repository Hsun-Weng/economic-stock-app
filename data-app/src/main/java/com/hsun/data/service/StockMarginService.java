package com.hsun.data.service;

import com.hsun.data.entity.StockMargin;

import java.util.Date;
import java.util.List;

public interface StockMarginService {
    List<StockMargin> getStockMarginByCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}

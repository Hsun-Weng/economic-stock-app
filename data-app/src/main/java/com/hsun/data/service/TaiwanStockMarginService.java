package com.hsun.data.service;

import com.hsun.data.entity.TaiwanStockMargin;

import java.util.Date;
import java.util.List;

public interface TaiwanStockMarginService {
    List<TaiwanStockMargin> getTaiwanStockMarginByStockCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}

package com.hsun.data.service;

import com.hsun.data.bean.StockMarginBean;
import com.hsun.data.entity.StockMargin;

import java.util.Date;
import java.util.List;

public interface StockMarginService {
    List<StockMarginBean> getStockMarginList(String futuresCode, Date startDate, Date endDate);
}

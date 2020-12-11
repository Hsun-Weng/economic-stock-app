package com.hsun.data.service;

import com.hsun.data.bean.StockChipBean;
import com.hsun.data.entity.StockChip;

import java.util.Date;
import java.util.List;

public interface StockChipService {
    List<StockChipBean> getStockChipList(String futuresCode, Date startDate, Date endDate);
}

package com.hsun.data.service;

import com.hsun.data.entity.StockChip;

import java.util.Date;
import java.util.List;

public interface StockChipService {
    List<StockChip> getStockChipByCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}

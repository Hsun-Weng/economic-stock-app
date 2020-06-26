package com.hsun.data.service;

import com.hsun.data.entity.TaiwanStockChip;

import java.util.Date;
import java.util.List;

public interface TaiwanStockChipService {
    List<TaiwanStockChip> getTaiwanStockChipByStockCodeAndDateBetween(String futuresCode, Date startDate, Date endDate);
}

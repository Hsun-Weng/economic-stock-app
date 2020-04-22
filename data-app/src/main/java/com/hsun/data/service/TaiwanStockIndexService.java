package com.hsun.data.service;

import java.util.Date;
import java.util.List;

import com.hsun.data.entity.TaiwanStockIndex;

public interface TaiwanStockIndexService {
    List<TaiwanStockIndex> getTaiwanStockIndexByIndexCodeAndDateBetween(String indexCode, Date startDate, Date endDate);
}

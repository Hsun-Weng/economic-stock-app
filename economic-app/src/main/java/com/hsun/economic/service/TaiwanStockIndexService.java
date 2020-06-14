package com.hsun.economic.service;

import com.hsun.economic.entity.TaiwanStock;
import com.hsun.economic.entity.TaiwanStockIndex;

import java.util.List;

public interface TaiwanStockIndexService {
    
    List<TaiwanStockIndex> getAllTaiwanIndexes();
}

package com.hsun.economic.service;

import java.util.List;

import com.hsun.economic.entity.TaiwanFutures;

public interface TaiwanFuturesService {
    
    List<TaiwanFutures> getAllTaiwanFutures();
    TaiwanFutures getTaiwanFuturesByFuturesCode(String futuresCode);
}

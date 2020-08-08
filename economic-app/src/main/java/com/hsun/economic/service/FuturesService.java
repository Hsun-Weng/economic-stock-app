package com.hsun.economic.service;

import java.util.List;

import com.hsun.economic.entity.Futures;

public interface FuturesService {
    
    List<Futures> getAllFutures();
    Futures getFuturesByCode(String futuresCode);
}

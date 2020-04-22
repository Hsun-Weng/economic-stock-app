package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.TaiwanFutures;
import com.hsun.economic.repository.TaiwanFuturesRepository;
import com.hsun.economic.service.TaiwanFuturesService;

@Service
public class TaiwanFuturesServiceImpl implements TaiwanFuturesService {
    
    @Autowired
    private TaiwanFuturesRepository repository;

    @Override
    public List<TaiwanFutures> getAllTaiwanFutures() {
        return repository.findAll();
    }

    @Override
    public TaiwanFutures getTaiwanFuturesByFuturesCode(String futuresCode) {
        return repository.findByFuturesCode(futuresCode);
    }

}

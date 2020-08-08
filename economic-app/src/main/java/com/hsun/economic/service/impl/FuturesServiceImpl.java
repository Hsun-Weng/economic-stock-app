package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.Futures;
import com.hsun.economic.repository.FuturesRepository;
import com.hsun.economic.service.FuturesService;

@Service
public class FuturesServiceImpl implements FuturesService {
    
    @Autowired
    private FuturesRepository repository;

    @Override
    public List<Futures> getAllFutures() {
        return repository.findAll();
    }

    @Override
    public Futures getFuturesByCode(String futuresCode) {
        return repository.findById(futuresCode).orElse(null);
    }
}

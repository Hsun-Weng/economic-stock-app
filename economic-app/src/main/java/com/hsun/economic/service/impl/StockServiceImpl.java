package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.Stock;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.service.StockService;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Override
    public List<Stock> getAllStocks() {
        return repository.findAll();
    }

}

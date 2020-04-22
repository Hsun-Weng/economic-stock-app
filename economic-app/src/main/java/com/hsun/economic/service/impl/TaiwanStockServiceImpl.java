package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.TaiwanStock;
import com.hsun.economic.repository.TaiwanStockRepository;
import com.hsun.economic.service.TaiwanStockService;

@Service
public class TaiwanStockServiceImpl implements TaiwanStockService {
    
    @Autowired
    private TaiwanStockRepository repository;

    @Override
    public List<TaiwanStock> getAllTaiwanStocks() {
        return repository.findAll();
    }

}

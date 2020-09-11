package com.hsun.economic.service.impl;

import com.hsun.economic.entity.StockIndex;
import com.hsun.economic.repository.StockIndexRepository;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockIndexServiceImpl implements StockIndexService {

    @Autowired
    private StockIndexRepository repository;

    @Override
    public List<StockIndex> getAllStockIndexes() { return repository.findAll(); }
}

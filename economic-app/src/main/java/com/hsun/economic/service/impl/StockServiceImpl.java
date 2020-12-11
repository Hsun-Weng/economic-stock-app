package com.hsun.economic.service.impl;

import com.hsun.economic.bean.StockBean;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Override
    public List<StockBean> getStockList() {
        return repository.findAll()
                .stream()
                .map((stock)->
                        new StockBean(stock.getStockCode(), stock.getStockName()))
                .collect(Collectors.toList());
    }

}

package com.hsun.economic.service.impl;

import com.hsun.economic.bean.StockIndexBean;
import com.hsun.economic.repository.StockIndexRepository;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockIndexServiceImpl implements StockIndexService {

    @Autowired
    private StockIndexRepository repository;

    @Override
    public List<StockIndexBean> getStockIndexList() {
        return repository.findAll()
                .stream()
                .map((stockIndex ->
                        new StockIndexBean(stockIndex.getIndexCode(), stockIndex.getIndexName())))
                .collect(Collectors.toList());
    }
}

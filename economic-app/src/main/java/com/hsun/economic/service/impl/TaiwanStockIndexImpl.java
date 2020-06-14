package com.hsun.economic.service.impl;

import com.hsun.economic.entity.TaiwanStockIndex;
import com.hsun.economic.repository.TaiwanStockIndexRepository;
import com.hsun.economic.service.TaiwanStockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiwanStockIndexImpl implements TaiwanStockIndexService {

    @Autowired
    private TaiwanStockIndexRepository repository;

    @Override
    public List<TaiwanStockIndex> getAllTaiwanIndexes() { return repository.findAll(); }
}

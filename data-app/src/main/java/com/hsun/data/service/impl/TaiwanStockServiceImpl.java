package com.hsun.data.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.TaiwanStock;
import com.hsun.data.repository.TaiwanStockRepository;
import com.hsun.data.service.TaiwanStockService;

@Service
public class TaiwanStockServiceImpl implements TaiwanStockService {
    
    @Autowired
    private TaiwanStockRepository repository;

    @Override
    public List<TaiwanStock> getTaiwanStockByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate);
    } 

    
}

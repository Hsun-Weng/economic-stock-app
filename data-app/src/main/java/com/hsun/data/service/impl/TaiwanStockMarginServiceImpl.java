package com.hsun.data.service.impl;

import com.hsun.data.entity.TaiwanStockMargin;
import com.hsun.data.repository.TaiwanStockChipRepository;
import com.hsun.data.repository.TaiwanStockMarginRepository;
import com.hsun.data.service.TaiwanStockMarginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class TaiwanStockMarginServiceImpl implements TaiwanStockMarginService {

    @Autowired
    private TaiwanStockMarginRepository repository;

    @Override
    public List<TaiwanStockMargin> getTaiwanStockMarginByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate);
    }
}

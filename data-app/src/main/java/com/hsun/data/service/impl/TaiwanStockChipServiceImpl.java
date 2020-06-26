package com.hsun.data.service.impl;

import com.hsun.data.entity.TaiwanStockChip;
import com.hsun.data.repository.TaiwanStockChipRepository;
import com.hsun.data.service.TaiwanStockChipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class TaiwanStockChipServiceImpl implements TaiwanStockChipService {

    @Autowired
    private TaiwanStockChipRepository repository;

    @Override
    public List<TaiwanStockChip> getTaiwanStockChipByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate);
    }
}

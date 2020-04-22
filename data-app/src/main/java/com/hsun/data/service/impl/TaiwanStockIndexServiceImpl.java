package com.hsun.data.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.TaiwanStockIndex;
import com.hsun.data.repository.TaiwanStockIndexRepository;
import com.hsun.data.service.TaiwanStockIndexService;

@Service
public class TaiwanStockIndexServiceImpl implements TaiwanStockIndexService {
    
    @Autowired
    private TaiwanStockIndexRepository repository;

    @Override
    public List<TaiwanStockIndex> getTaiwanStockIndexByIndexCodeAndDateBetween(String indexCode, Date startDate,
            Date endDate) {
        // 設置查詢起訖時間移至最早 & 最晚
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByIndexCodeAndDateBetween(indexCode, queryStartDate, queryEndDate);
    }


}

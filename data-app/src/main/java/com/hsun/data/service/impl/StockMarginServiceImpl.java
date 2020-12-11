package com.hsun.data.service.impl;

import com.hsun.data.bean.StockMarginBean;
import com.hsun.data.entity.StockMargin;
import com.hsun.data.repository.StockMarginRepository;
import com.hsun.data.service.StockMarginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockMarginServiceImpl implements StockMarginService {

    @Autowired
    private StockMarginRepository repository;

    @Override
    public List<StockMarginBean> getStockMarginList(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate)
                .stream()
                .map((stockMargin)-> StockMarginBean
                        .builder()
                        .stockCode(stockMargin.getStockCode())
                        .date(stockMargin.getDate())
                        .longShare(stockMargin.getLongShare())
                        .totalLongShare(stockMargin.getTotalLongShare())
                        .shortShare(stockMargin.getShortShare())
                        .totalShortShare(stockMargin.getTotalShortShare())
                        .dayShare(stockMargin.getDayShare())
                        .build())
                .collect(Collectors.toList());
    }
}

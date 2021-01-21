package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import com.hsun.data.bean.StockIndexPriceBean;
import com.hsun.data.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.StockIndex;
import com.hsun.data.repository.StockIndexRepository;
import com.hsun.data.service.StockIndexService;

@Service
public class StockIndexServiceImpl implements StockIndexService {
    
    @Autowired
    private StockIndexRepository repository;

    @Override
    public List<StockIndexPriceBean> getStockIndexByCodeAndDateBetween(String indexCode, LocalDate startDate
            , LocalDate endDate) {
        // 設置查詢起訖時間移至最早 & 最晚
        Date queryStartDate = Date.from(startDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(endDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByIndexCodeAndDateBetween(indexCode, queryStartDate, queryEndDate)
                .stream()
                .map((price)-> StockIndexPriceBean.builder()
                        .date(price.getDate())
                        .indexCode(price.getIndexCode())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public StockIndexPriceBean getStockIndexLatestPrice(String indexCode) {
        StockIndex price = repository.findFirstByIndexCodeOrderByDateDesc(indexCode)
                .orElseThrow(()->new ResourceNotFoundException("Not found"));

        return StockIndexPriceBean.builder()
                .date(price.getDate())
                .indexCode(price.getIndexCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->new BigDecimal(changePercent).multiply(BigDecimal.valueOf(100))
                                .setScale(2, RoundingMode.HALF_UP).floatValue())
                        .orElse(0f))
                .build();
    }

    @Override
    public List<StockIndexPriceBean> getBatchLatestPriceList(List<String> indexCodeList) {
        StockIndex latestStockIndex = repository.findFirstByOrderByDateDesc().orElseThrow(()->new ResourceNotFoundException("Not found"));
        LocalDate localLatestDate = latestStockIndex.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localLatestDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(localLatestDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());

        return repository.findByIndexCodeInAndDateBetween(indexCodeList, queryStartDate, queryEndDate)
                .stream()
                .map((price)->StockIndexPriceBean.builder()
                        .date(price.getDate())
                        .indexCode(price.getIndexCode())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .change(price.getChange())
                        .changePercent(Optional.ofNullable(price.getChangePercent())
                                .map(changePercent->new BigDecimal(changePercent).multiply(BigDecimal.valueOf(100))
                                        .setScale(2, RoundingMode.HALF_UP).floatValue())
                                .orElse(0f))
                        .build())
                .collect(Collectors.toList());
    }
}

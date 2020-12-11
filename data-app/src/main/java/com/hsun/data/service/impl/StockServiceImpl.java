package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.hsun.data.bean.StockPriceBean;
import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.Stock;
import com.hsun.data.repository.StockRepository;
import com.hsun.data.service.StockService;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<StockPriceBean> getStockPriceList(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate)
                .stream()
                .map((price)->StockPriceBean.builder()
                .date(price.getDate())
                .stockCode(price.getStockCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->changePercent*100).orElse(0f)).build()).collect(Collectors.toList());
    }

    @Override
    public List<StockPriceBean> getBatchStockLatestPriceList(List<String> stockCodeList) {
        Stock latestStock = repository.findFirstByOrderByDateDesc().orElseThrow(()->new ApiServerException("Not found"));
        LocalDate localLatestDate = latestStock.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localLatestDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(localLatestDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeInAndDateBetween(stockCodeList, queryStartDate, queryEndDate)
                .stream()
                .map((price)->StockPriceBean.builder()
                .date(price.getDate())
                .stockCode(price.getStockCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->changePercent*100).orElse(0f)).build()).collect(Collectors.toList());
    }

    @Override
    public Page<StockPriceBean> getStockSortedPage(PageRequest pageRequest) {
        Stock latestStock = repository.findFirstByOrderByDateDesc().orElseThrow(()->new ApiServerException("Not found"));
        LocalDate localLatestDate = latestStock.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localLatestDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(localLatestDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByDateBetween(queryStartDate, queryEndDate, pageRequest)
                .map((price)->StockPriceBean.builder()
                        .date(price.getDate())
                        .stockCode(price.getStockCode())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .change(price.getChange())
                        .changePercent(Optional.ofNullable(price.getChangePercent())
                                .map(changePercent->changePercent*100).orElse(0f)).build());
    }
}

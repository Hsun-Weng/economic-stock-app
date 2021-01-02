package com.hsun.data.service.impl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import com.hsun.data.bean.PageInfoBean;
import com.hsun.data.bean.StockPriceBean;
import com.hsun.data.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.Stock;
import com.hsun.data.repository.StockRepository;
import com.hsun.data.service.StockService;
import org.springframework.util.ObjectUtils;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<StockPriceBean> getStockPriceList(String stockCode, LocalDate startDate, LocalDate endDate) {
        Date queryStartDate = Date.from(startDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(endDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate)
                .stream()
                .map((price)->StockPriceBean.builder()
                .date(price.getDate())
                .stockCode(price.getStockCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .volume(price.getVolume())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->changePercent*100).orElse(0f)).build()).collect(Collectors.toList());
    }

    @Override
    public StockPriceBean getStockLatestPrice(String stockCode) {
        Stock price = repository.findFirstByStockCodeOrderByDateDesc(stockCode)
                .orElseThrow(()->new ResourceNotFoundException("Not found"));
        return StockPriceBean.builder()
                .date(price.getDate())
                .stockCode(price.getStockCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .volume(price.getVolume())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->changePercent*100).orElse(0f)).build();
    }

    @Override
    public List<StockPriceBean> getBatchStockLatestPriceList(List<String> stockCodeList) {
        Stock latestStock = repository.findFirstByOrderByDateDesc().orElseThrow(()->new ResourceNotFoundException("Not found"));
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
                .volume(price.getVolume())
                .change(price.getChange())
                .changePercent(Optional.ofNullable(price.getChangePercent())
                        .map(changePercent->changePercent*100).orElse(0f)).build()).collect(Collectors.toList());
    }

    @Override
    public PageInfoBean<StockPriceBean> getStockSortedPage(PageRequest pageRequest) {
        Stock latestStock = repository.findFirstByOrderByDateDesc().orElseThrow(()->new ResourceNotFoundException("Not found"));
        LocalDate localLatestDate = latestStock.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localLatestDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(localLatestDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());

        Page<Stock> stockPricePage = repository.findByDateBetween(queryStartDate, queryEndDate, pageRequest);
        List<StockPriceBean> stockPriceList = stockPricePage.getContent()
                .parallelStream()
                .filter((stockPrice)->!ObjectUtils.isEmpty(stockPrice.getVolume())&&stockPrice.getVolume()>0)
                .map((price)->StockPriceBean.builder()
                        .date(price.getDate())
                        .stockCode(price.getStockCode())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .volume(price.getVolume())
                        .change(price.getChange())
                        .changePercent(Optional.ofNullable(price.getChangePercent())
                                .map(changePercent->changePercent*100).orElse(0f)).build()).collect(Collectors.toList());

        return PageInfoBean.<StockPriceBean>builder()
                .totalPage(stockPricePage.getTotalPages())
                .page(stockPricePage.getPageable().getPageNumber())
                .size(stockPricePage.getSize())
                .content(stockPriceList)
                .build();
    }
}

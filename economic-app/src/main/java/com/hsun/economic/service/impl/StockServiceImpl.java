package com.hsun.economic.service.impl;

import com.hsun.economic.bean.*;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.resource.StockPriceResource;
import com.hsun.economic.resource.StockRankResource;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Autowired
    private StockPriceResource priceResource;

    @Autowired
    private StockRankResource stockRankResource;

    @Override
    public List<StockBean> getStockList() {
        return repository.findAll()
                .stream()
                .map((stock)->
                        new StockBean(stock.getStockCode(), stock.getStockName()))
                .collect(Collectors.toList());
    }

    @Override
    public PageInfoBean<StockPriceBean> getStockSortedPage(String sortColumn, Integer page, Integer size, String direction) {
        PageInfoBean<StockPriceBean> sortedStockPage = stockRankResource.getStockSortedPage(sortColumn, page, size, direction).getData();
        List<StockPriceBean> sortedStockList = sortedStockPage.getContent()
                .parallelStream()
                .map((stockPriceBean -> {//名稱補進
                    repository.findById(stockPriceBean.getStockCode())
                        .ifPresent((stock)->stockPriceBean.setStockName(stock.getStockName()));
                    return stockPriceBean;
                })).collect(Collectors.toList());

        sortedStockPage.setContent(sortedStockList);

        return sortedStockPage;
    }

    @Override
    public List<PriceBean> getPriceList(String stockCode, LocalDate startDate, LocalDate endDate) {
        return priceResource.getPriceList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE)).getData();
    }

    @Override
    public List<StockChipBean> getChipList(String stockCode, LocalDate startDate, LocalDate endDate) {
        return priceResource.getChipList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE)).getData();
    }

    @Override
    public List<StockMarginBean> getMarginList(String stockCode, LocalDate startDate, LocalDate endDate) {
        return priceResource.getMarginList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE)).getData();
    }

}

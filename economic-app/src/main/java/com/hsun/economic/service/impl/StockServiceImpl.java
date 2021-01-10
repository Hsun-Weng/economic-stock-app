package com.hsun.economic.service.impl;

import com.hsun.economic.bean.*;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.resource.StockResource;
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
    private StockResource stockResource;

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
        PageInfoBean<StockPriceBean> sortedStockPage = stockResource.getStockSortedPage(sortColumn, page, size, direction);
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
        return stockResource.getPriceList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE))
                .stream()
                .sorted((p1, p2)->Long.compare(p2.getDate().getTime(), p1.getDate().getTime()))
                .collect(Collectors.toList());
    }

    @Override
    public List<StockChipBean> getChipList(String stockCode, LocalDate startDate, LocalDate endDate) {
        return stockResource.getChipList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE))
                .stream()
                .sorted((p1, p2)->Long.compare(p2.getDate().getTime(), p1.getDate().getTime()))
                .collect(Collectors.toList());
    }

    @Override
    public List<StockMarginBean> getMarginList(String stockCode, LocalDate startDate, LocalDate endDate) {
        return stockResource.getMarginList(stockCode, startDate.format(DateTimeFormatter.ISO_DATE)
                , endDate.format(DateTimeFormatter.ISO_DATE))
                .stream()
                .sorted((p1, p2)->Long.compare(p2.getDate().getTime(), p1.getDate().getTime()))
                .collect(Collectors.toList());
    }

}

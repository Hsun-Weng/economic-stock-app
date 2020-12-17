package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PageInfoBean;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.StockBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.entity.Stock;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.resource.StockPriceResource;
import com.hsun.economic.resource.StockRankResource;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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

}

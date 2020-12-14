package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PageInfoBean;
import com.hsun.economic.bean.StockBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.repository.StockRepository;
import com.hsun.economic.resource.StockRankResource;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

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
        Page<StockPriceBean> sortedStockPage = stockRankResource.getStockSortedPage(sortColumn, page, size, direction).getData();
        List<StockPriceBean> sortedStockList = sortedStockPage.getContent();
        //TODO get page error
        return new PageInfoBean<>(null, null,null,sortedStockPage.getContent()
                .parallelStream()
                .map((stockPrice)->{
                    stockPrice.setStockName(repository.findById(stockPrice.getStockCode()).get().getStockName());
                    return stockPrice;
                })
                .collect(Collectors.toList()));
    }

}

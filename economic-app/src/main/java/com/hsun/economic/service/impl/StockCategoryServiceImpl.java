package com.hsun.economic.service.impl;

import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.bean.StockCategoryProportionBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.bean.StockProportionBean;
import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.repository.StockCategoryRepository;
import com.hsun.economic.resource.StockPriceResource;
import com.hsun.economic.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StockCategoryServiceImpl implements StockCategoryService {
    
    @Autowired
    private StockCategoryRepository repository;

    @Autowired
    private StockPriceResource stockPriceResource;

    @Override
    public List<StockCategoryBean> getCategoryList() {
        return repository.findAll()
                .stream()
                .map((category)->
                        new StockCategoryBean(category.getCategoryCode(), category.getCategoryName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<StockPriceBean> getStockPriceList(String categoryCode) {
        Optional<StockCategory> stockCategoryOptional = repository.findById(categoryCode);
        if(!stockCategoryOptional.isPresent()){
            return Collections.EMPTY_LIST;
        }
        return stockCategoryOptional.get()
                .getStockList()
                .parallelStream()
                .map((stock)->{
                    StockPriceBean priceBean = stockPriceResource.getLatestPrice(stock.getStockCode()).getData();
                    priceBean.setStockName(stock.getStockName());
                    return priceBean;
                }).collect(Collectors.toList());
    }

    @Override
    public List<StockCategoryProportionBean> getCategoriesStockProportionRanked() {
        List<StockCategory> categoryList = repository.findAll();
        return categoryList.parallelStream()
                .map((category)->{
            List<Map<String, Object>> stockProportionList = repository
                    .findByCategoryCodeOrderByProportionDescLimited(category.getCategoryCode(), 5);
            if(stockProportionList.size()==0){
                return null;
            }
            return StockCategoryProportionBean.builder()
                    .categoryCode(category.getCategoryCode())
                    .name(category.getCategoryName())
                    .children(stockProportionList
                            .parallelStream()
                            .map((stockProportionMap)->new StockProportionBean((String)stockProportionMap.get("stockCode"),
                                    (String) stockProportionMap.get("stockName")
                                    , (Float)stockProportionMap.get("proportion"), null))
                            .map((stockProportion -> {
                                stockProportion.setChangePercent(stockPriceResource
                                        .getLatestPrice(stockProportion.getStockCode()).getData().getChangePercent());
                                return stockProportion;
                            })).collect(Collectors.toList()))
                    .build();
        }).filter((category)->category!=null).collect(Collectors.toList());
    }

}

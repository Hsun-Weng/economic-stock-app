package com.hsun.economic.service.impl;

import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.bean.StockCategoryProportionBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.bean.StockProportionBean;
import com.hsun.economic.entity.Stock;
import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.repository.StockCategoryProportionViewRepository;
import com.hsun.economic.repository.StockCategoryRepository;
import com.hsun.economic.repository.StockProportionViewRepository;
import com.hsun.economic.resource.StockResource;
import com.hsun.economic.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class StockCategoryServiceImpl implements StockCategoryService {
    
    @Autowired
    private StockCategoryRepository repository;

    @Autowired
    private StockResource stockResource;

    @Autowired
    private StockCategoryProportionViewRepository categoryProportionViewRepository;

    @Autowired
    private StockProportionViewRepository stockProportionViewRepository;

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
        StockCategory stockCategory = stockCategoryOptional.get();
        List<String> stockCodeList = stockCategory
                .getStockList()
                .stream()
                .map(Stock::getStockCode)
                .collect(Collectors.toList());
        Map<String, StockPriceBean> stockPriceMap = stockResource.getLatestPriceList(stockCodeList)
                .parallelStream()
                .collect(Collectors.toMap(StockPriceBean::getStockCode, Function.identity()));

        return stockCategory
                .getStockList()
                .parallelStream()
                .map((stock)->{
                    if(stockPriceMap.containsKey(stock.getStockCode())) {
                        StockPriceBean priceBean = stockPriceMap.get(stock.getStockCode());
                        priceBean.setStockName(stock.getStockName());
                        return priceBean;
                    }else{
                        return null;
                    }
                })
                .filter((price)->!ObjectUtils.isEmpty(price)).collect(Collectors.toList());
    }

    @Override
    public List<StockCategoryProportionBean> getCategoriesStockProportionRanked() {
        List<StockCategoryProportionBean> categoryProportionList = categoryProportionViewRepository
                .findAll()
                .parallelStream()
                .map((categoryProportion)->StockCategoryProportionBean
                        .builder()
                        .categoryCode(categoryProportion.getCategoryCode())
                        .categoryName(categoryProportion.getCategoryName())
                        .proportion(categoryProportion.getProportion())
                        //只取前5筆
                        .children(stockProportionViewRepository.findByCategoryCode(categoryProportion.getCategoryCode()
                                , PageRequest.of(0, 15, Sort.Direction.DESC, "proportion"))
                                .stream()
                                .map((stockProportion)->StockProportionBean.builder()
                                        .stockCode(stockProportion.getStockCode())
                                        .stockName(stockProportion.getStockName())
                                        .proportion(stockProportion.getProportion())
                                        .build()
                                )
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        // 批次取價
        List<String> stockCodeList = categoryProportionList
                .parallelStream()
                .flatMap((categoryProportion)->categoryProportion.getChildren().stream().map(StockProportionBean::getStockCode))
                .collect(Collectors.toList());

        Map<String, Float> stockChangePercentMap = stockResource.getLatestPriceList(stockCodeList)
                .parallelStream().collect(Collectors.toMap(StockPriceBean::getStockCode, StockPriceBean::getChangePercent));

        return categoryProportionList.parallelStream()
                .map((categoryProportion)->{
                    categoryProportion.setChildren(categoryProportion.getChildren()
                            .stream()
                            .map((stockProportion)->{
                                stockProportion.setChangePercent(stockChangePercentMap.get(stockProportion.getStockCode()));
                                return stockProportion;
                            }).collect(Collectors.toList()));
                    return categoryProportion;
                }).collect(Collectors.toList());
    }

}

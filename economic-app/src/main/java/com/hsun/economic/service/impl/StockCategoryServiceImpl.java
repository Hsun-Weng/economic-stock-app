package com.hsun.economic.service.impl;

import com.hsun.economic.bean.StockBean;
import com.hsun.economic.bean.StockCategoryBean;
import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.repository.StockCategoryRepository;
import com.hsun.economic.service.StockCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StockCategoryServiceImpl implements StockCategoryService {
    
    @Autowired
    private StockCategoryRepository repository;

    @Override
    public List<StockCategoryBean> getCategoryList() {
        return repository.findAll()
                .stream()
                .map((category)->
                        new StockCategoryBean(category.getCategoryCode(), category.getCategoryName()))
                .collect(Collectors.toList());
    }

    @Override
    public List<StockBean> getStockList(String categoryCode) {
        List<StockBean> stockList = Collections.emptyList();
        Optional<StockCategory> stockCategoryOptional = repository.findById(categoryCode);
        if(stockCategoryOptional.isPresent()){
            stockList = stockCategoryOptional.get()
                    .getStockList()
                    .stream()
                    .map((stock)->
                            new StockBean(stock.getStockCode(), stock.getStockName()))
                    .collect(Collectors.toList());
        }
        return stockList;
    }

    @Override
    public List<Map<String, Object>> getCategoriesStockProportionRanked() {
        List<StockCategory> categoryList = repository.findAll();
        return categoryList.stream().map((category)->{
            Map<String, Object> categoryMap = new HashMap<String, Object>();
            List<Map<String, Object>> stockList = repository.findByCategoryCodeOrderByProportionDescLimited(category.getCategoryCode(), 5);
            if(stockList.size()==0){
                return null;
            }
            categoryMap.put("categoryCode", category.getCategoryCode());
            categoryMap.put("name", category.getCategoryName());
            categoryMap.put("children", stockList);
            return categoryMap;
        }).filter((category)->category!=null).collect(Collectors.toList());
    }

}

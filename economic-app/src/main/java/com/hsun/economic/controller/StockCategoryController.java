package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.StockCategory;
import com.hsun.economic.service.StockCategoryService;

@RestController
public class StockCategoryController {
    
    @Autowired
    private StockCategoryService service;
    
    @GetMapping("/categories")
    public ResponseBean getCategories() {
        ResponseBean responseBean = new ResponseBean();
        List<StockCategory> categoryList = null;
        List<Map<String, Object>> dataList = null;
        try {
            categoryList = service.getAllCategories();
            
            dataList = categoryList.stream().map((category)->{
                 Map<String, Object> dataMap = new HashMap<String, Object>();
                 dataMap.put("categoryCode", category.getCategoryCode());
                 dataMap.put("categoryName", category.getCategoryName());
                 return dataMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @GetMapping("/category/{categoryCode}/stocks")
    public ResponseBean getStockByCategory(@PathVariable String categoryCode) {
        ResponseBean responseBean = new ResponseBean();
        StockCategory category = null;
        List<Map<String, Object>> dataList = null;
        try {
            category = service.getCategoryByCode(categoryCode);

            dataList = category.getStockList().stream().map((stock)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("stockCode", stock.getStockCode());
                dataMap.put("stockName", stock.getStockName());
                return dataMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

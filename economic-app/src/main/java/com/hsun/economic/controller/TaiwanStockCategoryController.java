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
import com.hsun.economic.entity.TaiwanStock;
import com.hsun.economic.entity.TaiwanStockCategory;
import com.hsun.economic.service.TaiwanStockCategoryService;

@RestController
public class TaiwanStockCategoryController {
    
    @Autowired
    private TaiwanStockCategoryService service;
    
    @GetMapping("/stock/taiwan/categories")
    public ResponseBean getCategories() {
        ResponseBean responseBean = new ResponseBean();
        List<TaiwanStockCategory> categoryList = null;
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
    
    @GetMapping("/stock/taiwan/category/{categoryCode}/stocks")
    public ResponseBean getCategoryByCode(@PathVariable String categoryCode) {
        ResponseBean responseBean = new ResponseBean();
        List<TaiwanStockCategory> categoryList = null;
        List<Map<String, Object>> dataList = null;
        try {
            categoryList = service.getCategoryByCode(categoryCode);
            
            dataList = categoryList.stream().flatMap((category)->{
                 List<Map<String, Object>> stockList = category.getCategoryStock().stream().map((categoryStock)->{
                    Map<String, Object> dataMap = new HashMap<String, Object>();
                    TaiwanStock stock = categoryStock.getTaiwanStock();
                    dataMap.put("stockCode", stock.getStockCode());
                    dataMap.put("stockName", stock.getStockName());
                    return dataMap;
                }).collect(Collectors.toList());
                return stockList.stream();
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

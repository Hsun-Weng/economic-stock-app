package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.Stock;
import com.hsun.economic.service.StockService;

@RestController
public class StockController {
    
    @Autowired
    private StockService service;
    
    @GetMapping("/stocks")
    public ResponseBean getAllStocks() {
        ResponseBean responseBean = new ResponseBean();
        List<Stock> stockList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockList = service.getAllStocks();
            
            dataList = stockList.stream().map((stock)->{
                 Map<String, Object> stockMap = new HashMap<String, Object>();
                 stockMap.put("stockCode", stock.getStockCode());
                 stockMap.put("stockName", stock.getStockName());
                 return stockMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

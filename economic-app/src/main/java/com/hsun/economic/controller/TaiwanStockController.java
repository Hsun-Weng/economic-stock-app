package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.entity.TaiwanStock;
import com.hsun.economic.service.TaiwanStockService;

@RestController
public class TaiwanStockController {
    
    @Autowired
    private TaiwanStockService service;
    
    @GetMapping("/stock/taiwan")
    public Map<String, Object> getAllTaiwanStocks() {
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanStock> stockList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockList = service.getAllTaiwanStocks();
            
            dataList = stockList.stream().map((stock)->{
                 Map<String, Object> stockMap = new HashMap<String, Object>();
                 stockMap.put("stockCode", stock.getStockCode());
                 stockMap.put("stockName", stock.getStockName());
                 return stockMap;
            }).collect(Collectors.toList());
             
            result.put("data", dataList);
            
        }catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}

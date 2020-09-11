package com.hsun.data.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.*;

import com.hsun.data.entity.Stock;
import com.hsun.data.service.StockService;

@RestController
public class StockController {
    
    @Autowired
    private StockService service;

    @GetMapping("/stock/{stockCode}")
    public Map<String, Object> getStockByCodeAndDateBetween(@PathVariable String stockCode,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<Stock> stockList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockList = service.getStockByCodeAndDateBetween(stockCode, startDate, endDate);
            
            dataList = stockList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("stockCode", data.getStockCode());
                dataMap.put("open", data.getOpen());
                dataMap.put("low", data.getLow());
                dataMap.put("high", data.getHigh());
                dataMap.put("close", data.getClose());
                dataMap.put("volume", data.getVolume());
                return dataMap;
            }).collect(Collectors.toList());
            
            result.put("data", dataList);
            
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }

    @PostMapping("/stock/latest")
    public Map<String, Object> getBatchLatest(@RequestBody List<String> stockCodeList) {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> priceList = null;
        try{
            priceList = service.getBatchLatestPriceList(stockCodeList);

            result.put("data", priceList);
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

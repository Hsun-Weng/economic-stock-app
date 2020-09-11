package com.hsun.data.controller;

import com.hsun.data.entity.StockMargin;
import com.hsun.data.exception.ApiServerException;
import com.hsun.data.service.StockMarginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class StockMarginController {
    
    @Autowired
    private StockMarginService service;
    
    @GetMapping("/stock/{stockCode}/margin")
    public Map<String, Object> getStockMarginByCodeAndDateBetween(@PathVariable String stockCode,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<StockMargin> stockMarginList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockMarginList = service.getStockMarginByCodeAndDateBetween(stockCode, startDate, endDate);
            
            dataList = stockMarginList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("stockCode", data.getStockCode());
                dataMap.put("longShare", data.getLongShare());
                dataMap.put("shortShare", data.getShortShare());
                dataMap.put("totalLongShare", data.getTotalLongShare());
                dataMap.put("totalShortShare", data.getTotalShortShare());
                dataMap.put("dayShare", data.getDayShare());
                return dataMap;
            }).collect(Collectors.toList());
            
            result.put("data", dataList);
            
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

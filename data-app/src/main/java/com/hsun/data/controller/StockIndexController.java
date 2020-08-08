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

import com.hsun.data.entity.StockIndex;
import com.hsun.data.service.StockIndexService;

@RestController
public class StockIndexController {
    
    @Autowired
    private StockIndexService service;

    @GetMapping("/stock/index/{indexCode}")
    public Map<String, Object> getStockIndexByCodeAndDateBetween(@PathVariable String indexCode,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<StockIndex> stockIndexList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockIndexList = service.getStockIndexByCodeAndDateBetween(indexCode
                    , startDate, endDate);
            
            dataList = stockIndexList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("indexCode", data.getIndexCode());
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

    @PostMapping("/stock/index/latest")
    public Map<String, Object> getBatchLatest(@RequestBody List<String> indexCodeList) {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> priceList = null;
        try{
            priceList = service.getBatchLatestPriceList(indexCodeList);

            result.put("data", priceList);
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

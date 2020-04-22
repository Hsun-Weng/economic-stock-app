package com.hsun.data.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.entity.TaiwanStock;
import com.hsun.data.service.TaiwanStockService;

@RestController
public class TaiwanStockController {
    
    @Autowired
    private TaiwanStockService service;
    
    @GetMapping("/stock/taiwan/{stockCode}")
    public Map<String, Object> getTaiwanStockByStockCodeAndDateBetween(@PathVariable String stockCode, 
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanStock> taiwanStockList = null;
        List<Map<String, Object>> dataList = null;
        try {
            taiwanStockList = service.getTaiwanStockByStockCodeAndDateBetween(stockCode, startDate, endDate);
            
            dataList = taiwanStockList.stream().map((data)->{
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
            e.printStackTrace();
        }
        return result;
    }
}

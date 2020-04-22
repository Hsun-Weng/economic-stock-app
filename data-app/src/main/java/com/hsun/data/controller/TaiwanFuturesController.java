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

import com.hsun.data.entity.TaiwanFutures;
import com.hsun.data.service.TaiwanFuturesService;

@RestController
public class TaiwanFuturesController {
    
    @Autowired
    private TaiwanFuturesService service;
    
    @GetMapping("/futures/taiwan/{futuresCode}")
    public Map<String, Object> getTaiwanFuturesChipByFuturesCodeAndDateBetween(@PathVariable String futuresCode,@RequestParam String contractDate,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanFutures> taiwanFuturesList = null;
        List<Map<String, Object>> dataList = null;
        try {
            taiwanFuturesList = service.getTaiwanFuturesByFuturesCodeAndContractDateAndDateBetween(futuresCode, contractDate, startDate, endDate);
            
            dataList = taiwanFuturesList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("futuresCode", data.getFuturesCode());
                dataMap.put("contractDate", data.getContractDate());
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

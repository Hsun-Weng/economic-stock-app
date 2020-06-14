package com.hsun.data.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.entity.TaiwanStock;
import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.*;

import com.hsun.data.entity.TaiwanStockIndex;
import com.hsun.data.service.TaiwanStockIndexService;

@RestController
public class TaiwanStockIndexController {
    
    @Autowired
    private TaiwanStockIndexService service;

    @GetMapping("/stock/taiwan/index/{indexCode}")
    public Map<String, Object> getTaiwanStockIndexByIndexCodeAndDateBetween(@PathVariable String indexCode,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanStockIndex> taiwanStockIndexList = null;
        List<Map<String, Object>> dataList = null;
        try {
            taiwanStockIndexList = service.getTaiwanStockIndexByIndexCodeAndDateBetween(indexCode
                    , startDate, endDate);
            
            dataList = taiwanStockIndexList.stream().map((data)->{
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

    @PostMapping("/stock/taiwan/index/latest")
    public Map<String, Object> getBatchLatest(@RequestBody List<String> indexCodeList) {
        Map<String, Object> result = new HashMap<String, Object>();
        List<Map<String, Object>> dataList = null;
        try{
            dataList = service.getBatchLatestPriceList(indexCodeList);

            result.put("data", dataList);
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

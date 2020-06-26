package com.hsun.data.controller;

import com.hsun.data.entity.TaiwanStockChip;
import com.hsun.data.exception.ApiServerException;
import com.hsun.data.service.TaiwanStockChipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.util.StringUtils;
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
public class TaiwanStockChipController {
    
    @Autowired
    private TaiwanStockChipService service;
    
    @GetMapping("/stock/taiwan/{stockCode}/chip")
    public Map<String, Object> getTaiwanStockChipByStockCodeAndDateBetween(@PathVariable String stockCode,
            @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanStockChip> taiwanStockChipList = null;
        List<Map<String, Object>> dataList = null;
        try {
            taiwanStockChipList = service.getTaiwanStockChipByStockCodeAndDateBetween(stockCode, startDate, endDate);
            
            dataList = taiwanStockChipList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("stockCode", data.getStockCode());
                dataMap.put("netShare", data.getNetShare());
                dataMap.put("investorChip", data.getInvestorStockChip());
                return dataMap;
            }).collect(Collectors.toList());
            
            result.put("data", dataList);
            
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

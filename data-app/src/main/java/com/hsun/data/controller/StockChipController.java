package com.hsun.data.controller;

import com.hsun.data.entity.StockChip;
import com.hsun.data.exception.ApiServerException;
import com.hsun.data.service.StockChipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class StockChipController {
    
    @Autowired
    private StockChipService service;
    
    @GetMapping("/stock/{stockCode}/chip")
    public Map<String, Object> getStockChipByCodeAndDateBetween(@PathVariable String stockCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("data", service.getStockChipList(stockCode, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

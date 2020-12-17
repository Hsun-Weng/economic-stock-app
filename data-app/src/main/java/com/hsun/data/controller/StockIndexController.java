package com.hsun.data.controller;

import java.time.LocalDate;
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

    @GetMapping("/stock/index/{indexCode}/prices")
    public Map<String, Object> getStockIndexByCodeAndDateBetween(@PathVariable String indexCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("data", service.getStockIndexByCodeAndDateBetween(indexCode
                    , startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }

    @GetMapping("/stock/index/{indexCode}/price/latest")
    public Map<String, Object> getLatestPrice(@PathVariable String indexCode) {
        Map<String, Object> result = new HashMap<String, Object>();
        try{
            result.put("data", service.getStockIndexLatestPrice(indexCode));
        }catch(Exception e){
            e.printStackTrace();
            throw new ApiServerException();
        }
        return result;
    }

    @PostMapping("/stock/indexes/price/latest")
    public Map<String, Object> getBatchLatest(@RequestBody List<String> indexCodeList) {
        Map<String, Object> result = new HashMap<String, Object>();
        try{
            result.put("data", service.getBatchLatestPriceList(indexCodeList));
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

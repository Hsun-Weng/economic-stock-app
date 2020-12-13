package com.hsun.data.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        try {
            result.put("data", service.getStockPriceList(stockCode, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }

    @GetMapping("/stock/{stockCode}/latest")
    public Map<String, Object> getLatestPrice(@PathVariable String stockCode) {
        Map<String, Object> result = new HashMap<String, Object>();
        try{
            result.put("data", service.getStockLatestPrice(stockCode));
        }catch(Exception e){
            e.printStackTrace();
            throw new ApiServerException();
        }
        return result;
    }

    @PostMapping("/stock/latest")
    public Map<String, Object> getBatchLatestPrice(@RequestBody List<String> stockCodeList) {
        Map<String, Object> result = new HashMap<String, Object>();
        try{
            result.put("data", service.getBatchStockLatestPriceList(stockCodeList));
        }catch(Exception e){
            e.printStackTrace();
            throw new ApiServerException();
        }
        return result;
    }

    @GetMapping("/stock/latest/rank")
    public Map<String, Object> getRankLatest(@RequestParam String sortColumn, @RequestParam Integer page,
                                              @RequestParam Integer size, @RequestParam String direction) {
        Map<String, Object> result = new HashMap<String, Object>();
        try{
            result.put("data", service.getStockSortedPage(PageRequest.of(page, size, Sort.Direction.valueOf(direction)
                    , sortColumn)));
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

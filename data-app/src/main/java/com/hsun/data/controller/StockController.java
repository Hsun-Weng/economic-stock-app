package com.hsun.data.controller;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.hsun.data.bean.PageInfoBean;
import com.hsun.data.bean.StockPriceBean;
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

    @GetMapping("/stock/{stockCode}/prices")
    public Map<String, Object> getStockByCodeAndDateBetween(@PathVariable String stockCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("data", service.getStockPriceList(stockCode, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }

    @GetMapping("/stock/{stockCode}/price/latest")
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

    @PostMapping("/stocks/price/latest")
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

    @GetMapping("/stocks/rank/price/latest")
    public Map<String, PageInfoBean<StockPriceBean>> getRankLatest(@RequestParam String sortColumn, @RequestParam Integer page,
                                                                   @RequestParam Integer size, @RequestParam String direction) {
        Map<String, PageInfoBean<StockPriceBean>> result = new HashMap<>();
        try{
            result.put("data", service.getStockSortedPage(PageRequest.of(page, size, Sort.Direction.valueOf(direction)
                    , sortColumn)));
        }catch(Exception e){
            throw new ApiServerException();
        }
        return result;
    }
}

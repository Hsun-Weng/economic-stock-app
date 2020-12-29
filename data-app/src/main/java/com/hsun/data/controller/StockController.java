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
    public List<StockPriceBean> getStockByCodeAndDateBetween(@PathVariable String stockCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getStockPriceList(stockCode, startDate, endDate);
    }

    @GetMapping("/stock/{stockCode}/price/latest")
    public StockPriceBean getLatestPrice(@PathVariable String stockCode) {
        return service.getStockLatestPrice(stockCode);
    }

    @PostMapping("/stocks/price/latest")
    public List<StockPriceBean> getBatchLatestPrice(@RequestBody List<String> stockCodeList) {
        return service.getBatchStockLatestPriceList(stockCodeList);
    }

    @GetMapping("/stocks/rank/price/latest")
    public PageInfoBean<StockPriceBean> getRankLatest(@RequestParam String sortColumn, @RequestParam Integer page,
                                                                   @RequestParam Integer size, @RequestParam String direction) {
        return service.getStockSortedPage(PageRequest.of(page, size, Sort.Direction.valueOf(direction), sortColumn));
    }
}

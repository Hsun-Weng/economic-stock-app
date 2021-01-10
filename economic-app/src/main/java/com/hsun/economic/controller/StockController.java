package com.hsun.economic.controller;

import com.hsun.economic.bean.*;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class StockController {
    
    @Autowired
    private StockService service;
    
    @GetMapping("/stocks")
    public List<StockBean> getStockList() {
        return service.getStockList();
    }

    @GetMapping("/stocks/rank/latest")
    public PageInfoBean<StockPriceBean> getStockSortedPage(@RequestParam String sortColumn, @RequestParam Integer page,
                                                           @RequestParam Integer size, @RequestParam String direction) {
        return service.getStockSortedPage(sortColumn, page, size, direction);
    }

    @GetMapping("/stock/{stockCode}/prices")
    public List<PriceBean> getStockPriceList(@PathVariable String stockCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getPriceList(stockCode, startDate, endDate);
    }

    @GetMapping("/stock/{stockCode}/chips")
    public List<StockChipBean> getStockChipList(@PathVariable String stockCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getChipList(stockCode, startDate, endDate);
    }

    @GetMapping("/stock/{stockCode}/margins")
    public List<StockMarginBean> getStockMarginList(@PathVariable String stockCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getMarginList(stockCode, startDate, endDate);
    }
}

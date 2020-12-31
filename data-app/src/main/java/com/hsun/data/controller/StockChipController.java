package com.hsun.data.controller;

import com.hsun.data.bean.StockChipBean;
import com.hsun.data.service.StockChipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class StockChipController {
    
    @Autowired
    private StockChipService service;
    
    @GetMapping("/stock/{stockCode}/chip")
    public List<StockChipBean> getStockChipByCodeAndDateBetween(@PathVariable String stockCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getStockChipList(stockCode, startDate, endDate);
    }
}

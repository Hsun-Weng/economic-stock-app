package com.hsun.data.controller;

import com.hsun.data.bean.StockMarginBean;
import com.hsun.data.entity.StockMargin;
import com.hsun.data.exception.ApiServerException;
import com.hsun.data.service.StockMarginService;
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
public class StockMarginController {
    
    @Autowired
    private StockMarginService service;
    
    @GetMapping("/stock/{stockCode}/margin")
    public List<StockMarginBean> getStockMarginByCodeAndDateBetween(@PathVariable String stockCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getStockMarginList(stockCode, startDate, endDate);
    }
}

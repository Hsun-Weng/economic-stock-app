package com.hsun.data.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hsun.data.bean.StockIndexPriceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.*;

import com.hsun.data.service.StockIndexService;

@RestController
public class StockIndexController {
    
    @Autowired
    private StockIndexService service;

    @GetMapping("/stock/index/{indexCode}/prices")
    public List<StockIndexPriceBean> getStockIndexByCodeAndDateBetween(@PathVariable String indexCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getStockIndexByCodeAndDateBetween(indexCode, startDate, endDate);
    }

    @GetMapping("/stock/index/{indexCode}/price/latest")
    public StockIndexPriceBean getLatestPrice(@PathVariable String indexCode) {
        Map<String, Object> result = new HashMap<String, Object>();
        return service.getStockIndexLatestPrice(indexCode);
    }

    @PostMapping("/stock/indexes/price/latest")
    public List<StockIndexPriceBean> getBatchLatest(@RequestBody List<String> indexCodeList) {
        return service.getBatchLatestPriceList(indexCodeList);
    }
}

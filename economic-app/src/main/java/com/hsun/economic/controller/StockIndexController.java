package com.hsun.economic.controller;

import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.StockIndexBean;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class StockIndexController {
    
    @Autowired
    private StockIndexService service;
    
    @GetMapping("/indexes")
    public List<StockIndexBean> getStockIndexList() {
        return service.getStockIndexList();
    }

    @GetMapping("/stock/index/{indexCode}/prices")
    public List<PriceBean> getStockPriceList(@PathVariable String indexCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getPriceList(indexCode, startDate, endDate);
    }
}

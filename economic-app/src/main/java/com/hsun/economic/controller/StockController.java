package com.hsun.economic.controller;

import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.StockPriceBean;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
public class StockController {
    
    @Autowired
    private StockService service;
    
    @GetMapping("/stocks")
    public ResponseBean getStockList() {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getStockList());
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/stocks/rank/latest")
    public ResponseBean getStockSortedPage(@RequestParam String sortColumn, @RequestParam Integer page,
                                         @RequestParam Integer size, @RequestParam String direction) {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getStockSortedPage(sortColumn, page, size, direction));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/stock/{stockCode}/prices")
    public ResponseBean<List<PriceBean>> getStockPrices(@PathVariable String stockCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getPriceList(stockCode, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

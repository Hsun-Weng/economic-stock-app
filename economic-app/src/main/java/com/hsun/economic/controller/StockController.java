package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            e.printStackTrace();
            throw new ApiServerException();
        }
        return responseBean;
    }

}

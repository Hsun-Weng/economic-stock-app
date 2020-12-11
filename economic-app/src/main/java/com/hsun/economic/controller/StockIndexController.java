package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockIndexController {
    
    @Autowired
    private StockIndexService service;
    
    @GetMapping("/indexes")
    public ResponseBean getStockIndexList() {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getStockIndexList());
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

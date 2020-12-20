package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioProductController {

    @Autowired
    private PortfolioProductService service;

    @GetMapping("/products")
    public ResponseBean getProductList() {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getProductList());
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

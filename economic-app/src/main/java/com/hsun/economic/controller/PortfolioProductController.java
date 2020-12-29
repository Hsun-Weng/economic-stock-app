package com.hsun.economic.controller;

import com.hsun.economic.bean.ProductBean;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PortfolioProductController {

    @Autowired
    private PortfolioProductService service;

    @GetMapping("/products")
    public List<ProductBean> getProductList() {
        return service.getProductList();
    }
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductBean;
import com.hsun.economic.bean.ProductPriceBean;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PortfolioProductController {

    @Autowired
    private PortfolioProductService service;

    @GetMapping("/products")
    public List<ProductBean> getProductList() {
        return service.getProductList();
    }

    @PostMapping("/portfolio/{portfolioId}/product")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addPortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody PortfolioProductBean portfolioProductBean) {
        service.addPortfolioProduct(authentication.getName(), portfolioId, portfolioProductBean);
    }

    @PutMapping("/portfolio/{portfolioId}/products")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody List<PortfolioProductBean> portfolioProductBeanList){
        service.savePortfolioProducts(authentication.getName(), portfolioId, portfolioProductBeanList);
    }

    @GetMapping("/portfolio/{portfolioId}/product/prices")
    public List<ProductPriceBean> getPortfolioProductPriceList(Authentication authentication, @PathVariable Integer portfolioId){
        return service.getProductPriceList(authentication.getName(), portfolioId);
    }
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.PortfolioBean;
import com.hsun.economic.bean.PortfolioPriceBean;
import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductPriceBean;
import com.hsun.economic.service.PortfolioProductService;
import com.hsun.economic.service.UserPortfolioService;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserPortfolioController {

    @Autowired
    private UserPortfolioService service;

    @GetMapping("/portfolios")
    public List<PortfolioBean> getPortfolioList(Authentication authentication){
        return service.getPortfolioList(authentication.getName());
    }

    @PostMapping("/portfolio")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addPortfolio(Authentication authentication, @RequestBody PortfolioBean portfolioBean) {
        service.addPortfolio(authentication.getName(), portfolioBean);
    }

    @DeleteMapping("/portfolio/{portfolioId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePortfolio(Authentication authentication, @PathVariable Integer portfolioId) {
        service.deletePortfolio(authentication.getName(), portfolioId);
    }

    @PutMapping("/portfolio/{portfolioId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePortfolio(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody PortfolioBean portfolioBean) {
        service.updatePortfolio(authentication.getName(), portfolioId, portfolioBean);
    }

    @GetMapping("/portfolios/price/latest")
    public List<PortfolioPriceBean> getPortfolioPriceList(Authentication authentication){
        return service.getPortfolioPriceList(authentication.getName());
    }
}

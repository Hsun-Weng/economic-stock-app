package com.hsun.economic.controller;

import com.hsun.economic.bean.PortfolioBean;
import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.PriceBean;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.PortfolioProductService;
import com.hsun.economic.service.UserPortfolioService;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserPortfolioController {

    @Autowired
    private UserPortfolioService service;

    @Autowired
    private UserService userService;

    @Autowired
    private PortfolioProductService portfolioProductService;

    @GetMapping("/portfolio")
    public ResponseBean getPortfolioList(Authentication authentication){
        ResponseBean responseBean = new ResponseBean();
        try{
            responseBean.setData(service.getPortfolioList(authentication.getName()));
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/portfolio/{portfolioId}/products")
    public ResponseBean getPortfolioProductListById(Authentication authentication, @PathVariable Integer portfolioId){
        ResponseBean responseBean = new ResponseBean();
        try{
            responseBean.setData(service.getProductList(authentication.getName(), portfolioId));
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/portfolio")
    public ResponseBean addPortfolio(Authentication authentication, @RequestBody PortfolioBean portfolioBean) {
        ResponseBean responseBean = new ResponseBean();
        try{
            service.addPortfolio(authentication.getName(), portfolioBean);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @DeleteMapping("/portfolio/{portfolioId}")
    public ResponseBean deletePortfolio(Authentication authentication, @PathVariable Integer portfolioId) {
        ResponseBean responseBean = new ResponseBean();
        try{
            service.deletePortfolio(authentication.getName(), portfolioId);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PutMapping("/portfolio/{portfolioId}")
    public ResponseBean updatePortfolio(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody PortfolioBean portfolioBean) {
        ResponseBean responseBean = new ResponseBean();
        try{
            service.updatePortfolio(authentication.getName(), portfolioId, portfolioBean);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PutMapping("/portfolio/{portfolioId}/products")
    public ResponseBean updatePortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody List<PortfolioProductBean> portfolioProductBeanList){
        ResponseBean responseBean = new ResponseBean();
        try{
            portfolioProductService.savePortfolioProducts(authentication.getName()
                    , portfolioId, portfolioProductBeanList);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            e.printStackTrace();
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/portfolio/{portfolioId}/product")
    public ResponseBean addPortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody PortfolioProductBean portfolioProductBean) {
        ResponseBean responseBean = new ResponseBean();
        try{
            portfolioProductService.addPortfolioProduct(authentication.getName(), portfolioId, portfolioProductBean);
        }catch(DataIntegrityViolationException e){
            throw new ApiClientException("Product has been exists");
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @DeleteMapping("/portfolio/{portfolioId}/product/{productType}/{productCode}")
    public ResponseBean deletePortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @PathVariable Integer productType, @PathVariable String productCode) {
        ResponseBean responseBean = new ResponseBean();
        try{
            portfolioProductService.deletePortfolioProduct(authentication.getName(), portfolioId, productType, productCode);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            e.printStackTrace();
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/portfolio/{portfolioId}/product/prices")
    public ResponseBean<List<PriceBean>> getPortfolioProductPriceList(Authentication authentication, @PathVariable Integer portfolioId){
        ResponseBean responseBean = new ResponseBean();
        try{
            responseBean.setData(service.getProductPriceList(authentication.getName(), portfolioId));
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }
}

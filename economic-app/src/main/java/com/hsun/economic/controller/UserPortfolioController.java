package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.PortfolioProductService;
import com.hsun.economic.service.UserPortfolioService;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserPortfolioController {

    @Autowired
    private UserPortfolioService service;

    @Autowired
    private UserService userService;

    @Autowired
    private PortfolioProductService portfolioProductService;

    @GetMapping("/portfolio")
    public ResponseBean getPortfolioProductByPortfolioId(Authentication authentication){
        ResponseBean responseBean = new ResponseBean();
        User user = null;
        List<Map<String, Object>> dataList = null;
        try{
            user = userService.findUserByName(authentication.getName());

            dataList = user.getUserPortfolioList().stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("portfolioId", data.getPortfolioId());
                dataMap.put("portfolioName", data.getPortfolioName());
                return dataMap;
            }).collect(Collectors.toList());

            responseBean.setData(dataList);
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/portfolio/{portfolioId}/products")
    public ResponseBean getPortfolioProductListById(Authentication authentication, @PathVariable Integer portfolioId){
        ResponseBean responseBean = new ResponseBean();
        User user = null;
        List<Map<String, Object>> userProfolioProductList = null;
        try{
            user = userService.findUserByName(authentication.getName());

            userProfolioProductList = user.getUserPortfolioList().stream()
                    .filter((data)->data.getPortfolioId().equals(portfolioId))
                    .collect(Collectors.toList())
                    .get(0).getPortfolioProductList()
                    .stream().map((data)->{
                        Map<String, Object> dataMap = new HashMap<String, Object>();

                        return dataMap;
                    }).collect(Collectors.toList());

            responseBean.setData(userProfolioProductList);

        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/portfolio")
    public ResponseBean addPortfolio(Authentication authentication, @RequestBody UserPortfolio userPortfolio) {
        ResponseBean responseBean = new ResponseBean();
        try{
            service.addPortfolio(authentication.getName(), userPortfolio);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PutMapping("/portfolio/{portfolioId}/products")
    public ResponseBean updatePortfolioProduct(Authentication authentication, @PathVariable Integer portfolioId
            , @RequestBody List<PortfolioProduct> portfolioProductList){
        ResponseBean responseBean = new ResponseBean();
        try{
            portfolioProductService.savePortfolioProducts(authentication.getName()
                    , portfolioId, portfolioProductList);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/portfolio/product")
    public ResponseBean addPortfolioProduct(Authentication authentication, @RequestBody PortfolioProduct portfolioProduct) {
        ResponseBean responseBean = new ResponseBean();
        try{
            service.addPortfolioProduct(authentication.getName(), portfolioProduct);
        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }
}

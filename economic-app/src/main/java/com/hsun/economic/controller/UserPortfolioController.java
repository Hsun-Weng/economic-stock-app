package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.UserService;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserPortfolioController {

    @Autowired
    private UserService userService;

    @GetMapping("/portfolio")
    public ResponseBean getPortfolioByUser(Authentication authentication){
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

    @GetMapping("/portfolio/{portfolioId}")
    public ResponseBean getPortfolioById(Authentication authentication, @PathVariable Integer portfolioId){
        ResponseBean responseBean = new ResponseBean();
        User user = null;
        List<UserPortfolio> userPortfolioList = null;
        List<Map<String, Object>> result = null;
        try{
            user = userService.findUserByName(authentication.getName());

            userPortfolioList = user.getUserPortfolioList().stream()
                    .filter((data)->data.getPortfolioId().equals(portfolioId))
                    .collect(Collectors.toList());

            if(userPortfolioList.size() < 1){
                throw new ApiClientException("Can't found portfolio.");
            }

            result = userPortfolioList.get(0).getPortfolioProductList()
                    .stream().map((data)->{
                        Map<String, Object> dataMap = new HashMap<String, Object>();
                        
                        return dataMap;
                    }).collect(Collectors.toList());

            responseBean.setData(result);

        }catch(ApiClientException e){
            throw e;
        }catch(Exception e){
            throw new ApiServerException();
        }
        return responseBean;
    }
    
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserPorfolioController {

    @Autowired
    private UserService userService;

    @GetMapping("/portfolio")
    public ResponseBean getPortfolioByUser(Authentication authentication){
        ResponseBean responseBean = new ResponseBean();
        User user;
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
    
}

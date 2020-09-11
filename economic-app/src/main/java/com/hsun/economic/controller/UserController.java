package com.hsun.economic.controller;

import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    
    @Autowired
    private UserService service;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user")
    public ResponseBean getUser(Authentication authentication){
        ResponseBean responseBean = new ResponseBean();
        User user = null;

        try{
            user = service.findUserByName(authentication.getName());

            Map<String, Object> dataMap = new HashMap<String, Object>();
            dataMap.put("userName", user.getUserName());
            dataMap.put("firstName", user.getFirstName());
            dataMap.put("lastName", user.getLastName());

            responseBean.setData(dataMap);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @PostMapping("/user/signup")
    public ResponseBean saveUser(@RequestBody User user){
        ResponseBean responseBean = new ResponseBean();
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            service.saveUser(user);
        }catch(DataIntegrityViolationException e){
            throw new ApiClientException("Duplicate User Name");
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

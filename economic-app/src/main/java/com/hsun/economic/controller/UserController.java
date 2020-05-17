package com.hsun.economic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService service;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/user/signup")
    private ResponseBean saveUser(@RequestBody User user){
        ResponseBean responseBean = new ResponseBean();
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            service.saveUser(user);
            
            responseBean.setStatus(1);
        }catch(Exception e) {
            responseBean.setStatus(0);
            e.printStackTrace();
        }
        return responseBean;
    }
    
}

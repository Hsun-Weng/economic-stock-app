package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.entity.User;
import com.hsun.economic.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService service;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/user/signup")
    private Map<String, Object> saveUser(@RequestBody User user){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            service.saveUser(user);
            result.put("data", true);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.RequestOauthBean;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.bean.UserBean;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class UserController {
    
    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user")
    public ResponseBean<UserBean> getUser(Authentication authentication){
        ResponseBean responseBean = new ResponseBean();
        try{
            responseBean.setData(service.findUserByName(authentication.getName()));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @PostMapping("/user/signup")
    public ResponseBean saveUser(@RequestBody UserBean userBean){
        ResponseBean responseBean = new ResponseBean();
        try {
            userBean.setPassword(passwordEncoder.encode(userBean.getPassword()));
            service.saveUser(userBean);
        }catch(DataIntegrityViolationException e){
            throw new ApiClientException("Duplicate User Name");
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/user/oauth")
    public ResponseBean oauth(@RequestBody RequestOauthBean requestOauthBean, HttpServletResponse response){
        ResponseBean responseBean = new ResponseBean();
        try {
            Cookie cookie = new Cookie("token", service.oauth(requestOauthBean));
            cookie.setMaxAge(365*24*60*60);
            cookie.setHttpOnly(true);
            cookie.setPath("/");

            response.addCookie(cookie);
        }catch(Exception e) {
            e.printStackTrace();
            throw new ApiServerException();
        }
        return responseBean;
    }

    @PostMapping("/user/logout")
    public void logout(HttpServletResponse response){
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
//        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}

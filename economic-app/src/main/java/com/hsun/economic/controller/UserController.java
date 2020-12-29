package com.hsun.economic.controller;

import com.hsun.economic.bean.RequestOauthBean;
import com.hsun.economic.bean.UserBean;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class UserController {
    
    @Autowired
    private UserService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/user")
    public UserBean getUser(Authentication authentication){
        return service.getUser(authentication.getName());
    }
    
    @PostMapping("/user/signup")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveUser(@RequestBody UserBean userBean){
        service.saveUser(userBean);
    }

    @PostMapping("/user/oauth")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void oauth(@RequestBody RequestOauthBean requestOauthBean, HttpServletResponse response){
        Cookie cookie = new Cookie("token", service.oauth(requestOauthBean));
        cookie.setMaxAge(365*24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }

    @PostMapping("/user/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletResponse response){
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
//        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}

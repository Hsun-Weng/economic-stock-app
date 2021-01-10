package com.hsun.economic.controller;

import com.google.gson.JsonObject;
import com.hsun.economic.bean.PasswordBean;
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

    @PatchMapping("/user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void partialUpdateUser(Authentication authentication, @RequestBody JsonObject body) {
        service.partialUpdateUser(authentication.getName(), body);
    }
    
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveUser(@RequestBody UserBean userBean){
        service.saveUser(userBean);
    }

    @PutMapping("/user/password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePassword(Authentication authentication, @RequestBody PasswordBean passwordBean) {
        service.updatePassword(authentication.getName(), passwordBean);
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

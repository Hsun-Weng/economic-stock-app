package com.hsun.economic.controller;

import com.hsun.economic.bean.FacebookOauthBean;
import com.hsun.economic.service.OauthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class OauthController {

    @Autowired
    private OauthService service;

    @PostMapping("/oauth/facebook")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void oauth(@RequestBody FacebookOauthBean oauthBean, HttpServletResponse response){
        Cookie cookie = new Cookie("token", service.oauthFacebook(oauthBean.getCode()));
        cookie.setMaxAge(365*24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}

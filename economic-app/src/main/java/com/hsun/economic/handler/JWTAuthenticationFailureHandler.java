package com.hsun.economic.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.hsun.economic.bean.ResponseBean;

@Component
public class JWTAuthenticationFailureHandler implements AuthenticationFailureHandler {
    
    @Autowired
    private Gson gson;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        ResponseBean responseBean = new ResponseBean();
        
        responseBean.setStatus(0);
        responseBean.setMessage("Please confirm User Name or Password");

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(responseBean));
        response.getWriter().flush();;
    }

}

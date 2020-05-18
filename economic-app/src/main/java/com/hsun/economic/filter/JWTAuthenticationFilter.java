package com.hsun.economic.filter;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;
import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.constants.SecurityConstants;
import com.hsun.economic.entity.User;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    
    private AuthenticationManager authenticationManager;
    
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {
        Reader inputStreamReader = null;
        try {
            inputStreamReader = new InputStreamReader(request.getInputStream());
            User user = new Gson().fromJson(inputStreamReader, User.class);
            inputStreamReader.close();
            
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    user.getUserName(),
                    user.getPassword(),
                    new ArrayList<>()
                    ));
            
        } catch(IOException e) {
            throw new RuntimeException(e);
        } finally {
            if(inputStreamReader != null) {
                try {
                    inputStreamReader.close();
                } catch (IOException e) {}
            }
        }
    }
    
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {
        String token = JWT.create()
                .withSubject(authResult.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET));
        
        ResponseBean responseBean = new ResponseBean();
        responseBean.setData(token);
        responseBean.setStatus(1);
        
        response.getWriter().write(new Gson().toJson(responseBean));
        response.getWriter().flush();
    }
    
}

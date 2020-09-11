package com.hsun.economic.filter;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hsun.economic.config.WebSecurityConfig;
import com.hsun.economic.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.hsun.economic.entity.User;
import com.hsun.economic.service.UserService;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private JwtUtil jwtUtil = null;
    private UserService userService = null;
    private WebSecurityConfig webSecurityConfig = null;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager,
                                  JwtUtil jwtUtil, UserService userService,
                                  WebSecurityConfig webSecurityConfig) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.webSecurityConfig = webSecurityConfig;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
                    throws IOException, ServletException {
        String header = request.getHeader(webSecurityConfig.getAuthenticationHeader());
        
        if(StringUtils.isEmpty(header) || !header.startsWith(webSecurityConfig.getTokenPrefix())) {
            chain.doFilter(request, response);
            return;
        }

        String token = header.replace(webSecurityConfig.getTokenPrefix(), "").trim();
        String userName =  jwtUtil.getUsernameFromToken(token);
        if(!StringUtils.isEmpty(userName) && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.findUserByName(userName);
            if(jwtUtil.validateToken(token, user)) {
                UsernamePasswordAuthenticationToken authentication = this.getAuthentication(request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        chain.doFilter(request, response);
    }
    
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(webSecurityConfig.getAuthenticationHeader());
        if (token != null) {
            // parse the token.
            String user = JWT.require(Algorithm.HMAC512(webSecurityConfig.getKey().getBytes()))
                    .build()
                    .verify(token.replace(webSecurityConfig.getTokenPrefix(), "").trim())
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }

}

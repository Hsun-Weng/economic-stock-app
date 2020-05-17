package com.hsun.economic.filter;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.hsun.economic.constants.SecurityConstants;
import com.hsun.economic.entity.User;
import com.hsun.economic.service.UserService;
import com.hsun.economic.util.JwtUtils;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    private JwtUtils jwtUtil;
    
    @Autowired
    private UserService userService;
    
    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
                    throws IOException, ServletException {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        
        if(StringUtils.isEmpty(token) || !token.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }
        
        String userName =  jwtUtil.getUsernameFromToken(token);
        if(StringUtils.isEmpty(userName) && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.findUserByName(userName);
            if(jwtUtil.validateToken(token, user)) {
                UsernamePasswordAuthenticationToken authentication = this.getAuthentication(request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        chain.doFilter(request, response);
    }
    
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()))
                    .build()
                    .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }

}

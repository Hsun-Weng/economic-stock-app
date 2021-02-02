package com.hsun.economic.filter;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.hsun.economic.bean.UserBean;
import com.hsun.economic.config.WebSecurityConfig;
import com.hsun.economic.service.UserService;
import com.hsun.economic.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

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

        Cookie[] cookies = request.getCookies();
        if(ObjectUtils.isEmpty(cookies) || cookies.length == 0){
            chain.doFilter(request, response);
            return;
        }

        Optional<Cookie> tokenCookieOptional = Arrays.stream(cookies)
                .filter((cookie)->cookie.getName().equals("token"))
                .findAny();
        if(!tokenCookieOptional.isPresent()){
            chain.doFilter(request, response);
            return;
        }
        Cookie tokenCookie = tokenCookieOptional.get();
        if(StringUtils.isEmpty(tokenCookie.getValue())){
            chain.doFilter(request, response);
            return;
        }

        String token = tokenCookie.getValue();
        try {
            String userName = jwtUtil.getUsernameFromToken(token);
            if (!StringUtils.isEmpty(userName) && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserBean userBean = userService.getUser(userName);
                if (jwtUtil.validateToken(token, userBean)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userBean.getUserName(), null, new ArrayList<>());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch(TokenExpiredException e) {
            Cookie cookie = new Cookie("token", null);
            cookie.setMaxAge(0);
//            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");

            response.addCookie(cookie);
        }
        chain.doFilter(request, response);
    }
}

package com.hsun.economic.filter;

import com.google.gson.Gson;
import com.hsun.economic.entity.User;
import com.hsun.economic.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil = null;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
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
            throws IOException {
        User user = new User();
        user.setUserName(authResult.getName());

        Cookie cookie = new Cookie("token", jwtUtil.generateToken(user));
        cookie.setMaxAge(365*24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);
    }
}

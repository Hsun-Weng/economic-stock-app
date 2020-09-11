package com.hsun.economic.util;

import java.util.Date;

import com.hsun.economic.config.WebSecurity;
import com.hsun.economic.config.WebSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.hsun.economic.entity.User;

import javax.annotation.PostConstruct;

@Component
public class JwtUtil {

    @Autowired
    private WebSecurityConfig webSecurityConfig;
    
    private Algorithm alg = null;

    @PostConstruct
    private void initital(){
        alg = Algorithm.HMAC512(webSecurityConfig.getKey());
    }

    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getUserName())
                .withExpiresAt(new Date(System.currentTimeMillis() + webSecurityConfig.getExpirationTime()))
                .sign(alg);
    }
    
    public boolean validateToken(String token, User user) {
        String userName = this.getUsernameFromToken(token);
        return (userName.equals(user.getUserName())) && ! isTokenExpired(token);
    }
    
    public boolean isTokenExpired(String token) {
        return this.getExpirationDateFromToken(token).before(new Date());
    }
    
    public String getUsernameFromToken(String token) {
        return this.getDecodedJWTFromToken(token).getSubject();
    }
    
    public Date getExpirationDateFromToken(String token) {
        return this.getDecodedJWTFromToken(token).getExpiresAt();
    }
    
    private DecodedJWT getDecodedJWTFromToken(String token) {
        JWTVerifier verifier = JWT.require(alg).build();
        return verifier.verify(token);
    }
}

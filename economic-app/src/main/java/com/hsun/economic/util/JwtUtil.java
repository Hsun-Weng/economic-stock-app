package com.hsun.economic.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.hsun.economic.constants.SecurityConstants;
import com.hsun.economic.entity.User;

@Component
public class JwtUtil {
    
    private final Algorithm ALG = Algorithm.HMAC512(SecurityConstants.SECRET);
    
    public String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getUserName())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .sign(ALG);
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
        JWTVerifier verifier = JWT.require(ALG).build();
        return verifier.verify(token);
    }
}

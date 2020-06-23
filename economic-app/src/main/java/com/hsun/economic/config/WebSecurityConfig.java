package com.hsun.economic.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("security")
@Data
public class WebSecurityConfig {
    private String key;
    private long expirationTime;
    private String tokenPrefix;
    private String authenticationHeader;
}

package com.hsun.economic.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties("oauth2.facebook")
@Data
public class FacebookOauthConfig {
    private String redirectUri;
    private String clientId;
    private String clientSecret;
    private List<String> fields;
}

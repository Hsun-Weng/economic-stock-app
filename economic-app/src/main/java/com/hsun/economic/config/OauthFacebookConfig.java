package com.hsun.economic.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("security.oauth2.client.registration.facebook")
@Data
public class OauthFacebookConfig {
    private String clientId;
    private String clientSecret;
    private String accessTokenUri;
}

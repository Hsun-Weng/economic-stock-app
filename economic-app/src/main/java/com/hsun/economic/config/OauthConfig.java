package com.hsun.economic.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties("security.oauth2")
@Data
public class OauthConfig {
    private List<OauthClientConfig> clients;
}

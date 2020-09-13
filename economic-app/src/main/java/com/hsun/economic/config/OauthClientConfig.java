package com.hsun.economic.config;

import lombok.Data;

import java.util.List;

@Data
public class OauthClientConfig {
    private String providerName;
    private Integer providerCode;
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String accessTokenUri;
    private String userInfoUri;
    private List<String> fields;
}

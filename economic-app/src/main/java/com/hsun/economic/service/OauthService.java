package com.hsun.economic.service;

public interface OauthService {
    /**
     * facebook oauth2登入
     * @param code 授權碼
     * @return
     */
    String oauthFacebook(String code);
}

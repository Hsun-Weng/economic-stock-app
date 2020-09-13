package com.hsun.economic.service;

import com.hsun.economic.bean.OauthUser;
import com.hsun.economic.bean.ResponseOauthBean;

public interface OauthTokenService {
    ResponseOauthBean getAccessTokenByCode(Integer providerCode, String code);
    OauthUser getUserInfoFromToken(Integer providerCode, String tokenType, String accessToken);
}

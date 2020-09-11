package com.hsun.economic.service;

import com.hsun.economic.bean.OauthBean;

public interface OauthFacebookService {
    OauthBean getAccessTokenByCode(String code);
}

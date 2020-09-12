package com.hsun.economic.service.impl;

import com.hsun.economic.bean.OauthBean;
import com.hsun.economic.config.OauthFacebookConfig;
import com.hsun.economic.service.OauthFacebookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class OauthFacebookServiceImpl implements OauthFacebookService {

    @Autowired
    private OauthFacebookConfig oauthFacebookConfig;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public OauthBean getAccessTokenByCode(String code) {
        Map<String, Object> requestMap = new HashMap<String, Object>();
        requestMap.put("client_id", oauthFacebookConfig.getClientId());
        requestMap.put("redirect_uri", oauthFacebookConfig);
        requestMap.put("client_secret", oauthFacebookConfig.getClientSecret());
        requestMap.put("code", code);

        ResponseEntity<OauthBean> responseEntity = restTemplate.getForEntity(oauthFacebookConfig.getAccessTokenUri(), OauthBean.class, requestMap);

        return responseEntity.getBody();
    }
}

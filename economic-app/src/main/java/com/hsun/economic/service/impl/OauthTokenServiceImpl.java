package com.hsun.economic.service.impl;

import com.hsun.economic.bean.OauthUser;
import com.hsun.economic.bean.ResponseOauthBean;
import com.hsun.economic.config.OauthClientConfig;
import com.hsun.economic.config.OauthConfig;
import com.hsun.economic.service.OauthTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class OauthTokenServiceImpl implements OauthTokenService {

    @Autowired
    private OauthConfig oauthConfig;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public ResponseOauthBean getAccessTokenByCode(Integer providerCode, String code) {
        OauthClientConfig oauthClientConfig = oauthConfig.getClients()
                .stream()
                .filter((client) -> client.getProviderCode() == providerCode)
                .findFirst().orElse(null);

        Map<String, Object> queryParamsMap = new HashMap<String, Object>();
        queryParamsMap.put("clientId", oauthClientConfig.getClientId());
        queryParamsMap.put("redirectUri", oauthClientConfig.getRedirectUri());
        queryParamsMap.put("clientSecret", oauthClientConfig.getClientSecret());
        queryParamsMap.put("code", code);

        ResponseEntity<ResponseOauthBean> responseEntity =
                restTemplate.getForEntity(oauthClientConfig.getAccessTokenUri(), ResponseOauthBean.class, queryParamsMap);

        if (!responseEntity.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException(responseEntity.getBody().getError().getError());
        }
        return responseEntity.getBody();
    }

    @Override
    public OauthUser getUserInfoFromToken(Integer providerCode, String tokenType, String accessToken) {
        OauthClientConfig oauthClientConfig = oauthConfig.getClients()
                .stream()
                .filter((client)->client.getProviderCode()==providerCode)
                .findFirst().orElse(null);

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add(HttpHeaders.AUTHORIZATION,
                tokenType.substring(0, 1).toUpperCase() +
                            tokenType.substring(1)
                        + " " + accessToken);
        System.out.println(httpHeaders);

        Map<String, Object> queryParamsMap = new HashMap<String, Object>();
        queryParamsMap.put("fields", String.join(",", oauthClientConfig.getFields()));

        ResponseEntity<OauthUser> response = restTemplate.exchange(oauthClientConfig.getUserInfoUri(), HttpMethod.GET,
                new HttpEntity(httpHeaders), OauthUser.class, queryParamsMap);

        if(!response.getStatusCode().is2xxSuccessful()){
            throw new RuntimeException("Failed");
        }
        return response.getBody();
    }
}

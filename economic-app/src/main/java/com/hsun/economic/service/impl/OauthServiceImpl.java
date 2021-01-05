package com.hsun.economic.service.impl;

import com.hsun.economic.bean.FacebookOauthBean;
import com.hsun.economic.bean.FacebookUserBean;
import com.hsun.economic.config.FacebookOauthConfig;
import com.hsun.economic.entity.OauthToken;
import com.hsun.economic.entity.OauthTokenPK;
import com.hsun.economic.entity.User;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.OauthTokenRepository;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.resource.FacebookResource;
import com.hsun.economic.service.OauthService;
import com.hsun.economic.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;

@Service
public class OauthServiceImpl implements OauthService {

    @Autowired
    private FacebookOauthConfig facebookOauthConfig;

    @Autowired
    private FacebookResource facebookResource;

    @Autowired
    private OauthTokenRepository oauthTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    @Override
    public String oauthFacebook(String code) {
        if(StringUtils.isEmpty(code)){
            throw new ApiClientException("授權碼登入錯誤");
        }
        FacebookOauthBean oauthBean = facebookResource.getToken(facebookOauthConfig.getRedirectUri()
                , facebookOauthConfig.getClientId(), facebookOauthConfig.getClientSecret(), code);
        FacebookUserBean facebookUserBean = facebookResource.getUser(String.format("%s %s"
                , oauthBean.getTokenType().substring(0, 1).toUpperCase() + oauthBean.getTokenType().substring(1),
                oauthBean.getAccessToken()), String.join(",", facebookOauthConfig.getFields()));

        OauthTokenPK oauthTokenPK = new OauthTokenPK();
        oauthTokenPK.setProviderCode(0);
        oauthTokenPK.setUserName(facebookUserBean.getEmail());

        OauthToken oauthToken = oauthTokenRepository.findById(oauthTokenPK).orElseGet(()->{
            OauthToken newOauthToken = new OauthToken();
            newOauthToken.setId(oauthTokenPK);
            return newOauthToken;
        });

        oauthToken.setAccessToken(oauthBean.getAccessToken());
        oauthToken.setExpiresIn(oauthBean.getExpiresIn());
        oauthToken.setTokenType(oauthBean.getTokenType());

        User user = userRepository.findById(facebookUserBean.getEmail()).orElseGet(()->{
            User newUser = new User();
            newUser.setUserName(facebookUserBean.getEmail());
            newUser.setNickName(facebookUserBean.getName());
            return newUser;
        });

        userRepository.save(user);
        oauthTokenRepository.save(oauthToken);

        return jwtUtil.generateToken(user);
    }
}

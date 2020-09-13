package com.hsun.economic.service.impl;

import com.hsun.economic.bean.OauthUser;
import com.hsun.economic.bean.RequestOauthBean;
import com.hsun.economic.bean.ResponseOauthBean;
import com.hsun.economic.entity.OauthToken;
import com.hsun.economic.entity.OauthTokenPK;
import com.hsun.economic.entity.User;
import com.hsun.economic.repository.OauthTokenRepository;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.OauthTokenService;
import com.hsun.economic.service.UserService;
import com.hsun.economic.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private OauthTokenRepository oauthTokenRepository;

    @Autowired
    private OauthTokenService oauthTokenService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void saveUser(User user) {
        repository.save(user);
    }

    @Override
    public User findUserByName(String userName) {
        return repository.findById(userName).orElse(null);
    }

    @Override
    @Transactional
    public String oauth(RequestOauthBean requestOauthBean) {
        ResponseOauthBean responseOauthBean =
                oauthTokenService.getAccessTokenByCode(requestOauthBean.getProviderCode(), requestOauthBean.getCode());

        OauthUser oauthUser = oauthTokenService.getUserInfoFromToken(requestOauthBean.getProviderCode(),
                responseOauthBean.getTokenType(), responseOauthBean.getAccessToken());

        OauthTokenPK oauthTokenPK = new OauthTokenPK();
        oauthTokenPK.setProviderCode(requestOauthBean.getProviderCode());
        oauthTokenPK.setUserName(oauthUser.getEmail());

        OauthToken oauthToken = oauthTokenRepository.findById(oauthTokenPK).orElseGet(()->{
            OauthToken newOauthToken = new OauthToken();
            newOauthToken.setId(oauthTokenPK);
            return newOauthToken;
        });

        oauthToken.setAccessToken(responseOauthBean.getAccessToken());
        oauthToken.setExpiresIn(responseOauthBean.getExpiresIn());
        oauthToken.setTokenType(responseOauthBean.getTokenType());

        User user = repository.findById(oauthUser.getEmail()).orElseGet(()->{
            User newUser = new User();
            newUser.setUserName(oauthUser.getEmail());
            newUser.setLastName(oauthUser.getName());
            return newUser;
        });

        repository.save(user);
        oauthTokenRepository.save(oauthToken);

        return jwtUtil.generateToken(user);
    }

}

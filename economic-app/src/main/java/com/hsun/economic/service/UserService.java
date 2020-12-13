package com.hsun.economic.service;

import com.hsun.economic.bean.RequestOauthBean;
import com.hsun.economic.bean.UserBean;

public interface UserService {
    void saveUser(UserBean userBean);
    UserBean findUserByName(String userName);
    String oauth(RequestOauthBean requestOauthBean);
}

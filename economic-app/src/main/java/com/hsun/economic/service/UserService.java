package com.hsun.economic.service;

import com.google.gson.JsonObject;
import com.hsun.economic.bean.PasswordBean;
import com.hsun.economic.bean.UserBean;

public interface UserService {
    void saveUser(UserBean userBean);
    void partialUpdateUser(String userName, JsonObject body);
    void updatePassword(String userName, PasswordBean passwordBean);
    UserBean getUser(String userName);
}

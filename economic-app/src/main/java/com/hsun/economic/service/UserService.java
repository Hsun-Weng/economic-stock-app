package com.hsun.economic.service;

import com.hsun.economic.entity.User;

public interface UserService {
    void saveUser(User user);
    User findUserByName(String userName);
}

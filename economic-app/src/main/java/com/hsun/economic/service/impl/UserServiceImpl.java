package com.hsun.economic.service.impl;

import com.hsun.economic.bean.UserBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.exception.DuplicateException;
import com.hsun.economic.exception.ResourceNotFoundException;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveUser(UserBean userBean) {
        if(repository.findById(userBean.getUserName()).isPresent()) {
            throw new DuplicateException("帳號重複");
        }
        User user = new User();
        user.setUserName(userBean.getUserName());
        user.setPassword(passwordEncoder.encode(userBean.getPassword()));
        user.setFirstName(userBean.getFirstName());
        user.setLastName(userBean.getLastName());
        repository.save(user);
    }

    @Override
    public UserBean getUser(String userName) {
        User user = repository.findById(userName).orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        return new UserBean(user.getUserName(), null, user.getFirstName(), user.getLastName());
    }
}

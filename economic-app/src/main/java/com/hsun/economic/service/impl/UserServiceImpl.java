package com.hsun.economic.service.impl;

import com.google.gson.JsonObject;
import com.hsun.economic.bean.PasswordBean;
import com.hsun.economic.bean.UserBean;
import com.hsun.economic.entity.User;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.DuplicateException;
import com.hsun.economic.exception.ResourceNotFoundException;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;

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
        if(StringUtils.isEmpty(userBean.getPassword())){
            throw new ApiClientException("請輸入密碼");
        }
        User user = new User();
        user.setUserName(userBean.getUserName());
        user.setPassword(passwordEncoder.encode(userBean.getPassword()));
        user.setNickName(userBean.getNickName());
        repository.save(user);
    }

    @Override
    public void partialUpdateUser(String userName, JsonObject body) {
        User user = repository.findById(userName).orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        for(String key : body.keySet()){
            switch(key){
                case "nickName":
                    user.setNickName(body.get(key).getAsString());
                    break;
            }
        }
        repository.save(user);
    }

    @Transactional
    @Override
    public void updatePassword(String userName, PasswordBean passwordBean) {
        User user = repository.findById(userName).orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        if(StringUtils.isEmpty(passwordBean.getPassword())||
                !passwordEncoder.matches(passwordBean.getPassword(), user.getPassword())){
            throw new ApiClientException("請確認密碼");
        }
        if(StringUtils.isEmpty(passwordBean.getNewPassword())){
            throw new ApiClientException("請輸入新密碼");
        }
        if(passwordBean.getNewPassword().equals(passwordBean.getPassword())){
            throw new ApiClientException("新密碼不得與密碼相同");
        }
        user.setPassword(passwordEncoder.encode(passwordBean.getNewPassword()));
        repository.save(user);
    }

    @Override
    public UserBean getUser(String userName) {
        User user = repository.findById(userName).orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        return new UserBean(user.getUserName(), null, user.getNickName());
    }
}

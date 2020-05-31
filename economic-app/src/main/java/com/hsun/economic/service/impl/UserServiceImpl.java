package com.hsun.economic.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.User;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepository repository;

    @Override
    public void saveUser(User user) {
        repository.save(user);
    }

    @Override
    public User findUserByName(String userName) {
        return repository.findByName(userName).orElse(null);
    }

}

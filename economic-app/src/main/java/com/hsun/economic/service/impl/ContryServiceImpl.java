package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.Country;
import com.hsun.economic.repository.CountryRepository;
import com.hsun.economic.service.ContryService;

@Service
public class ContryServiceImpl implements ContryService{
    
    @Autowired
    private CountryRepository repository;

    @Override
    public List<Country> getAllCountries() {
        return repository.findAll();
    }
}

package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.Country;
import com.hsun.economic.repository.CountryRepository;
import com.hsun.economic.service.CountryService;

@Service
public class CountryServiceImpl implements CountryService {
    
    @Autowired
    private CountryRepository repository;

    @Override
    public List<Country> getAllCountries() {
        return repository.findAll();
    }

    @Override
    public Country getCountryByCode(String countryCode) {
        return repository.findById(countryCode).orElse(null);
    }
}

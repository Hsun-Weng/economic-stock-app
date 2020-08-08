package com.hsun.economic.service;

import java.util.List;

import com.hsun.economic.entity.Country;

public interface CountryService {
    List<Country> getAllCountries();
    Country getCountryByCode(String countryCode);
}

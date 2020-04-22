package com.hsun.data.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.EconomicData;
import com.hsun.data.repository.EconomicDataRepository;
import com.hsun.data.service.EconomicDataService;

@Service
public class EconomicDataServiceImpl implements EconomicDataService {
    
    @Autowired
    private EconomicDataRepository repository;
    

    @Override
    public List<EconomicData> getByCountryDataId(String countryCode, Integer dataId) {
        return repository.findByCountryCodeAndDataId(countryCode, dataId);
    }

}

package com.hsun.economic.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.economic.entity.EconomicData;
import com.hsun.economic.repository.EconomicDataRepository;
import com.hsun.economic.service.EconomicDataService;

@Service
public class EconomicDataServiceImpl implements EconomicDataService {
    
    @Autowired
    private EconomicDataRepository repository;

    @Override
    public List<EconomicData> getAllEconomicData() {
        return repository.findAll();
    }

    
}

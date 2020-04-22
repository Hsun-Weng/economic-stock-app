package com.hsun.data.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.EconomicChart;
import com.hsun.data.repository.EconomicChartRepository;
import com.hsun.data.service.EconomicChartService;

@Service
public class EconomicChartServiceImpl implements EconomicChartService {
    
    @Autowired
    private EconomicChartRepository repository;
    
    @Override
    public EconomicChart getChartByDataId(Integer dataId) {
        return repository.findByDataId(dataId);
    }

}

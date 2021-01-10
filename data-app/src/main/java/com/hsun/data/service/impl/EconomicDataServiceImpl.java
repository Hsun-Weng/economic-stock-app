package com.hsun.data.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.hsun.data.bean.EconomicDataBean;
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
    public List<EconomicDataBean> getDataByCodeAndCountryCode(String countryCode, String dataCode) {
        return repository.findByCountryCodeAndDataCode(countryCode, dataCode)
                .stream()
                .map(economicData -> new EconomicDataBean(economicData.getDate(),
                        economicData.getValue()))
                .collect(Collectors.toList());
    }

}

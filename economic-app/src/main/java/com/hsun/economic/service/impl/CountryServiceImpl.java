package com.hsun.economic.service.impl;

import com.hsun.economic.bean.CountryBean;
import com.hsun.economic.bean.EconomicDataBean;
import com.hsun.economic.bean.EconomicValueBean;
import com.hsun.economic.entity.Country;
import com.hsun.economic.repository.CountryRepository;
import com.hsun.economic.resource.EconomicResource;
import com.hsun.economic.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {
    
    @Autowired
    private CountryRepository repository;

    @Autowired
    private EconomicResource economicResource;

    @Override
    public List<CountryBean> getCountryList() {
        return repository.findAll()
                .stream()
                .map((country -> new CountryBean(country.getCountryCode(),
                        country.getCountryName())))
                .collect(Collectors.toList());
    }

    @Override
    public List<EconomicDataBean> getEconomicDataList(String countryCode) {
        List<EconomicDataBean> economicDataList = Collections.emptyList();

        Optional<Country> countryOptional = repository.findById(countryCode);
        if(countryOptional.isPresent()){
            economicDataList = countryOptional.get().getEconomicDataList()
                    .stream()
                    .map((economicData)->
                            new EconomicDataBean(economicData.getDataCode(), economicData.getDataName()))
                    .collect(Collectors.toList());
        }

        return economicDataList;
    }

    @Override
    public List<EconomicValueBean> getEconomicValueList(String countryCode, String dataCode) {
        return economicResource.getValueList(countryCode, dataCode).getData();
    }
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.CountryBean;
import com.hsun.economic.bean.EconomicDataBean;
import com.hsun.economic.bean.EconomicValueBean;
import com.hsun.economic.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CountryController {
    
    @Autowired
    private CountryService service;
    
    @GetMapping("/countries")
    public List<CountryBean> getCountries() {
        return service.getCountryList();
    }

    @GetMapping("/economic/{countryCode}/data")
    public List<EconomicDataBean> getEconomicDataByCountry(@PathVariable String countryCode){
        return service.getEconomicDataList(countryCode);
    }

    @GetMapping("/economic/{countryCode}/{dataCode}/values")
    public List<EconomicValueBean> getEconomicValue(@PathVariable String countryCode, @PathVariable String dataCode){
        return service.getEconomicValueList(countryCode, dataCode);
    }
}

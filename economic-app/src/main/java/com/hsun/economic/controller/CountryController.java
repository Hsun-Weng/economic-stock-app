package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {
    
    @Autowired
    private CountryService service;
    
    @GetMapping("/countries")
    public ResponseBean getCountries() {
        ResponseBean responseBean = new ResponseBean();
        try {
            responseBean.setData(service.getCountryList());
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }

    @GetMapping("/economic/{countryCode}/data")
    public ResponseBean getEconomicDataByCountry(@PathVariable String countryCode){
        ResponseBean responseBean = new ResponseBean();
        try{
            responseBean.setData(service.getEconomicDataList(countryCode));
        } catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.Country;
import com.hsun.economic.service.ContryService;

@RestController
public class CountryController {
    
    @Autowired
    private ContryService service;
    
    @GetMapping("/countries")
    public ResponseBean getContries() {
        ResponseBean responseBean = new ResponseBean();
        List<Country> countryList = null;
        List<Map<String, Object>> dataList = null;
        try {
            countryList = service.getAllCountries();
            
            dataList = countryList.stream().map((country)->{
                 Map<String, Object> countryMap = new HashMap<String, Object>();
                 countryMap.put("countryCode", country.getCountryCode());
                 countryMap.put("countryName", country.getCountryName());
                 return countryMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.entity.EconomicData;
import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.Country;
import com.hsun.economic.service.CountryService;

@RestController
public class CountryController {
    
    @Autowired
    private CountryService service;
    
    @GetMapping("/countries")
    public ResponseBean getCountries() {
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

    @GetMapping("/economic/{countryCode}/data")
    public ResponseBean getEconomicDataByCountry(@PathVariable String countryCode){
        ResponseBean responseBean = new ResponseBean();
        Country country = null;
        List<Map<String, Object>> dataList = null;
        try{
            country = service.getCountryByCode(countryCode);

            dataList = country.getEconomicDataList().stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();

                dataMap.put("dataCode", data.getDataCode());
                dataMap.put("dataName", data.getDataName());

                return dataMap;
            }).collect(Collectors.toList());

            responseBean.setData(dataList);

        } catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

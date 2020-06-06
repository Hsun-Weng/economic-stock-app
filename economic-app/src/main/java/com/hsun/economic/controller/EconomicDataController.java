package com.hsun.economic.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.EconomicData;
import com.hsun.economic.service.EconomicDataService;

@RestController
public class EconomicDataController {
    
    @Autowired
    private EconomicDataService service;

    @GetMapping("/economic/{countryCode}/data")
    public ResponseBean getEconomicDataByCountry(@PathVariable String countryCode){
        ResponseBean responseBean = new ResponseBean();
        List<EconomicData> economicDataList = null;
        List<Map<String, Object>> dataList = null;
        try{
            economicDataList = service.getAllEconomicData();

            dataList = economicDataList.stream().filter((data)->{
                return data.getCountryEconomicData().stream().filter((relData)->
                        relData.getCountry().getCountryCode().equals(countryCode)).findAny().isPresent();
            }).map((data)->{
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

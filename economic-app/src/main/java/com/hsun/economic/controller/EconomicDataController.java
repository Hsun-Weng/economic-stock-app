package com.hsun.economic.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.EconomicData;
import com.hsun.economic.service.EconomicDataService;

@RestController
public class EconomicDataController {
    
    @Autowired
    private EconomicDataService service;
    
    @GetMapping("/economic/country/data")
    public ResponseBean getCountryEconomicData(){
        ResponseBean responseBean = new ResponseBean();
        List<EconomicData> economicDataList = null;
        List<Map<String, Object>> dataList = null;
        try {
            economicDataList = service.getAllEconomicData();
            
            dataList = economicDataList.stream().flatMap((data)->{
                List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
                
                data.getCountryEconomicData()
                .stream()
                .forEach((countryEconomicData) -> {
                    Map<String, Object> dataMap = new HashMap<String, Object>();
                    dataMap.put("dataId", data.getDataId());
                    dataMap.put("dataName", data.getDataName());
                    dataMap.put("countryCode", countryEconomicData.getCountry().getCountryCode());
                    resultList.add(dataMap);
                });
                 
                return resultList.stream();
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);
            responseBean.setStatus(1);
            
        }catch(Exception e) {
            responseBean.setStatus(0);
            e.printStackTrace();
        }
        return responseBean;
    }
    
    @GetMapping("/economic/data")
    public ResponseBean getAllEconomicData(){
        ResponseBean responseBean = new ResponseBean();
        List<EconomicData> economicDataList = null;
        List<Map<String, Object>> dataList = null;
        try {
            economicDataList = service.getAllEconomicData();
            
            dataList = economicDataList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                
                dataMap.put("dataId", data.getDataId());
                dataMap.put("dataName", data.getDataName());
                
                return dataMap;
            }).collect(Collectors.toList());
            
            responseBean.setData(dataList);
            responseBean.setStatus(1);
        }catch(Exception e) {
            responseBean.setStatus(0);
            e.printStackTrace();
        }
        return responseBean;
    }
}

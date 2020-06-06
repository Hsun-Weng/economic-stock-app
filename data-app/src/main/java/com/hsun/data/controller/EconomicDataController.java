package com.hsun.data.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.entity.EconomicData;
import com.hsun.data.service.EconomicDataService;

@RestController
public class EconomicDataController {
    
    @Autowired
    private EconomicDataService service;
    
    @GetMapping("/economic/data/{countryCode}/{dataCode}")
    public Map<String, Object> getEconomicDataByDataCode(@PathVariable String countryCode,
            @PathVariable String dataCode) {
        Map<String, Object> result = new HashMap<String, Object>();
        List<EconomicData> economicDataList = null;
        List<Map<String, Object>> dataList = null;
        try {
            economicDataList = service.getByCountryDataCode(countryCode, dataCode);
            
            dataList = economicDataList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("value", data.getValue());
                return dataMap;
            }).collect(Collectors.toList());
             
            result.put("data", dataList);
            
        }catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    
}

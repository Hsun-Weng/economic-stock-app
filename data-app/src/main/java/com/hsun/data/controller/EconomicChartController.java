package com.hsun.data.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.entity.EconomicChart;
import com.hsun.data.service.EconomicChartService;

@RestController
public class EconomicChartController {
    
    @Autowired
    private EconomicChartService service;
    
    @GetMapping("/economic/chart/{dataId}")
    public Map<String, Object> getEconomicChartByDataId(@PathVariable Integer dataId) {
        Map<String, Object> result = new HashMap<String, Object>();
        Map<String, Object> dataMap = new HashMap<String, Object>();
        EconomicChart economicChart = null;
        try {
            economicChart = service.getChartByDataId(dataId);
            
            dataMap.put("dataName", economicChart.getDataName());
            dataMap.put("chart", economicChart.getChart());
            
            result.put("data", dataMap);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    
}

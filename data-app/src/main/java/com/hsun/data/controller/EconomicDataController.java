package com.hsun.data.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.bean.EconomicDataBean;
import com.hsun.data.exception.ApiServerException;
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
    
    @GetMapping("/economic/{countryCode}/{dataCode}")
    public List<EconomicDataBean> getEconomicDataByDataCode(@PathVariable String countryCode,
                                                            @PathVariable String dataCode) {
        return service.getDataByCodeAndCountryCode(countryCode, dataCode);
    }
    
}

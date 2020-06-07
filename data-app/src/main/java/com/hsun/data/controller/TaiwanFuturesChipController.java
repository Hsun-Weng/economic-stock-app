package com.hsun.data.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.entity.TaiwanFuturesChip;
import com.hsun.data.service.TaiwanFuturesChipService;

@RestController
public class TaiwanFuturesChipController {
    
    @Autowired
    private TaiwanFuturesChipService service;
    
    @GetMapping("/futures/taiwan/{futuresCode}/chip")
    public Map<String, Object> getTaiwanFuturesChipByFuturesCodeAndDateBetween(@PathVariable String futuresCode,
            @RequestParam(required=false) String investorCode, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        List<TaiwanFuturesChip> taiwanFuturesChipList = null;
        List<Map<String, Object>> dataList = null;
        try {
            taiwanFuturesChipList = service.getTaiwanFuturesChipByFuturesCodeAndDateBetween(futuresCode, startDate, endDate);
            
            dataList = taiwanFuturesChipList.stream().map((data)->{
                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("date", data.getDate());
                dataMap.put("futuresCode", data.getFuturesCode());
                dataMap.put("openInterestLot", data.getOpenInterestLot());
                dataMap.put("investorChip", data.getInvestorChip().stream()
                        .filter((chip)->StringUtils.isEmpty(investorCode)
                                ||chip.getInvestorCode().equals(investorCode))
                        .collect(Collectors.toList()));
                return dataMap;
            }).collect(Collectors.toList());
            
            result.put("data", dataList);
            
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

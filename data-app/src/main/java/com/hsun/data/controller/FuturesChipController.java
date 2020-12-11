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

import com.hsun.data.entity.FuturesChip;
import com.hsun.data.service.FuturesChipService;

@RestController
public class FuturesChipController {
    
    @Autowired
    private FuturesChipService service;
    
    @GetMapping("/futures/{futuresCode}/chip")
    public Map<String, Object> getFuturesChipByCodeAndDateBetween(@PathVariable String futuresCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam Date endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("data", service.getFuturesChipList(futuresCode, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

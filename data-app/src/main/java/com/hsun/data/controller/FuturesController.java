package com.hsun.data.controller;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.data.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.entity.Futures;
import com.hsun.data.service.FuturesService;

@RestController
public class FuturesController {
    
    @Autowired
    private FuturesService service;
    
    @GetMapping("/futures/{futuresCode}")
    public Map<String, Object> getFuturesChipByCodeAndDateBetween(@PathVariable String futuresCode
            , @RequestParam String contractDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("data", service.getFuturesPriceList(futuresCode, contractDate, startDate, endDate));
        }catch(Exception e) {
            throw new ApiServerException();
        }
        return result;
    }
}

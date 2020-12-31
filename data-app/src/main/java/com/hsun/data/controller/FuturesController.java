package com.hsun.data.controller;

import java.time.LocalDate;
import java.util.List;

import com.hsun.data.bean.FuturesPriceBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.service.FuturesService;

@RestController
public class FuturesController {
    
    @Autowired
    private FuturesService service;
    
    @GetMapping("/futures/{futuresCode}")
    public List<FuturesPriceBean> getFuturesChipByCodeAndDateBetween(@PathVariable String futuresCode
            , @RequestParam String contractDate, @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getFuturesPriceList(futuresCode, contractDate, startDate, endDate);
    }
}

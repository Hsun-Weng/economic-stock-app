package com.hsun.data.controller;

import java.time.LocalDate;
import java.util.List;

import com.hsun.data.bean.FuturesChipBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.data.service.FuturesChipService;

@RestController
public class FuturesChipController {
    
    @Autowired
    private FuturesChipService service;
    
    @GetMapping("/futures/{futuresCode}/chip")
    public List<FuturesChipBean> getFuturesChipByCodeAndDateBetween(@PathVariable String futuresCode
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getFuturesChipList(futuresCode, startDate, endDate);
    }
}

package com.hsun.economic.controller;

import com.hsun.economic.bean.FuturesBean;
import com.hsun.economic.bean.FuturesChipBean;
import com.hsun.economic.bean.FuturesContractBean;
import com.hsun.economic.service.FuturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class FuturesController {
    
    @Autowired
    private FuturesService service;
    
    @GetMapping("/futures")
    public List<FuturesBean> getFuturesList() {
        return service.getFuturesList();
    }
    
    @GetMapping("/futures/{futuresCode}/contract")
    public List<FuturesContractBean> getFuturesContractByCode(@PathVariable String futuresCode){
        return service.getFuturesByCode(futuresCode);
    }

    @GetMapping("/futures/{futuresCode}/chip")
    public List<FuturesChipBean> getFuturesChipList(@PathVariable String futuresCode
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate startDate
            , @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)  @RequestParam LocalDate endDate){
        return service.getFuturesChipList(futuresCode, startDate, endDate);
    }
}

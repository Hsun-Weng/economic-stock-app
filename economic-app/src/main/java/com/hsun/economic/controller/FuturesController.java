package com.hsun.economic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hsun.economic.exception.ApiServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.Futures;
import com.hsun.economic.service.FuturesService;

@RestController
public class FuturesController {
    
    @Autowired
    private FuturesService service;
    
    @GetMapping("/futures")
    public ResponseBean getAllFutures() {
        ResponseBean responseBean = new ResponseBean();
        List<Futures> futuresList = null;
        List<Map<String, Object>> dataList = null;
        try {
            futuresList = service.getAllFutures();
            
            dataList = futuresList.stream().map((futures)->{
                 Map<String, Object> futuresMap = new HashMap<String, Object>();
                 futuresMap.put("futuresCode", futures.getFuturesCode());
                 futuresMap.put("futuresName", futures.getFuturesName());
                 futuresMap.put("indexCode", futures.getStockIndex().getIndexCode());
                 return futuresMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @GetMapping("/futures/{futuresCode}/contract")
    public ResponseBean getFuturesContractByCode(@PathVariable String futuresCode){
        ResponseBean responseBean = new ResponseBean();
        Futures futures = null;
        List<Map<String, Object>> dataList = null;
        try {
            futures = service.getFuturesByCode(futuresCode);
            
            dataList = futures.getFuturesContractList().stream().map((futuresContract)->{
                 Map<String, Object> dataMap = new HashMap<String, Object>();
                 dataMap.put("contractDate", futuresContract.getId().getContractDate());
                 return dataMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

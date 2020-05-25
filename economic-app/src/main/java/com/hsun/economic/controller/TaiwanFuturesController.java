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
import com.hsun.economic.entity.TaiwanFutures;
import com.hsun.economic.service.TaiwanFuturesService;

@RestController
public class TaiwanFuturesController {
    
    @Autowired
    private TaiwanFuturesService service;
    
    @GetMapping("/futures/taiwan")
    public ResponseBean getAllTaiwanFutures() {
        ResponseBean responseBean = new ResponseBean();
        List<TaiwanFutures> futuresList = null;
        List<Map<String, Object>> dataList = null;
        try {
            futuresList = service.getAllTaiwanFutures();
            
            dataList = futuresList.stream().map((futures)->{
                 Map<String, Object> futuresMap = new HashMap<String, Object>();
                 futuresMap.put("futuresCode", futures.getFuturesCode());
                 futuresMap.put("futuresName", futures.getFuturesName());
                 return futuresMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @GetMapping("/futures/taiwan/{futuresCode}")
    public ResponseBean getTaiwanFutures(@PathVariable String futuresCode) {
        ResponseBean responseBean = new ResponseBean();
        TaiwanFutures taiwanFutures = null;
        Map<String, Object> dataMap = null;
        try {
            taiwanFutures = service.getTaiwanFuturesByFuturesCode(futuresCode);
            
            dataMap = new HashMap<String, Object>();
            dataMap.put("futuresCode", taiwanFutures.getFuturesCode());
            dataMap.put("futuresName", taiwanFutures.getFuturesName());
            dataMap.put("indexCode", taiwanFutures.getTaiwanStockIndex().getIndexCode());
            
            responseBean.setData(dataMap);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
    
    @GetMapping("/futures/taiwan/{futuresCode}/contract")
    public ResponseBean getTaiwanFuturesContractByFuturesCode(@PathVariable String futuresCode){
        ResponseBean responseBean = new ResponseBean();
        TaiwanFutures futures = null;
        List<Map<String, Object>> dataList = null;
        try {
            futures = service.getTaiwanFuturesByFuturesCode(futuresCode);
            
            dataList = futures.getTaiwanFuturesContract().stream().map((futuresContract)->{
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

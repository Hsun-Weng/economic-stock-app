package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.StockIndex;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.StockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class StockIndexController {
    
    @Autowired
    private StockIndexService service;
    
    @GetMapping("/indexes")
    public ResponseBean getAllStockIndexes() {
        ResponseBean responseBean = new ResponseBean();
        List<StockIndex> stockIndexList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockIndexList = service.getAllStockIndexes();
            
            dataList = stockIndexList.stream().map((stockIndex)->{
                 Map<String, Object> stockMap = new HashMap<String, Object>();
                 stockMap.put("indexCode", stockIndex.getIndexCode());
                 stockMap.put("indexName", stockIndex.getIndexName());
                 return stockMap;
            }).collect(Collectors.toList());
             
            responseBean.setData(dataList);

        }catch(Exception e) {
            throw new ApiServerException();
        }
        return responseBean;
    }
}

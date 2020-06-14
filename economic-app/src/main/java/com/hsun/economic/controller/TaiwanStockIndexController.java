package com.hsun.economic.controller;

import com.hsun.economic.bean.ResponseBean;
import com.hsun.economic.entity.TaiwanStockIndex;
import com.hsun.economic.exception.ApiServerException;
import com.hsun.economic.service.TaiwanStockIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class TaiwanStockIndexController {
    
    @Autowired
    private TaiwanStockIndexService service;
    
    @GetMapping("/stock/taiwan/index")
    public ResponseBean getAllTaiwanIndexes() {
        ResponseBean responseBean = new ResponseBean();
        List<TaiwanStockIndex> stockList = null;
        List<Map<String, Object>> dataList = null;
        try {
            stockList = service.getAllTaiwanIndexes();
            
            dataList = stockList.stream().map((stockIndex)->{
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

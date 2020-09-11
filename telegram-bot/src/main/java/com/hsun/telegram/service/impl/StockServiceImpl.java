package com.hsun.telegram.service.impl;

import com.hsun.telegram.bean.SendResponse;
import com.hsun.telegram.config.ApiConfig;
import com.hsun.telegram.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private ApiConfig apiConfig;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Map<String, Object> findStockLatestPrice(String stockCode) {
        Map<String, Object> stockMap = null;
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        String postUrl = apiConfig.getDataApi() + "/stock/taiwan/latest";
        try{
            Map<String, Object> result = restTemplate.postForObject(postUrl, Arrays.asList(stockCode), Map.class);
            List<Map<String, Object>> stockList = (List<Map<String, Object>>) result.getOrDefault("data", Collections.emptyList());
            if(stockList.size() > 0){
                stockMap = stockList.get(0);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return stockMap;
    }
}

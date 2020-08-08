package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.StockIndex;
import com.hsun.data.repository.StockIndexRepository;
import com.hsun.data.service.StockIndexService;

@Service
public class StockIndexServiceImpl implements StockIndexService {
    
    @Autowired
    private StockIndexRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<StockIndex> getStockIndexByCodeAndDateBetween(String indexCode, Date startDate,
                                                                         Date endDate) {
        // 設置查詢起訖時間移至最早 & 最晚
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByIndexCodeAndDateBetween(indexCode, queryStartDate, queryEndDate);
    }

    @Override
    public List<Map<String, Object>> getBatchLatestPriceList(List<String> indexCodeList) {
        List<Map<String, Object>> batchLatestPriceList = new ArrayList<Map<String, Object>>(indexCodeList.size());

        Query query = null;

        for(String stockCode : indexCodeList){
            query = new Query(Criteria.where("index_code").is(stockCode))
                    .with(Sort.by(Sort.Order.desc("date"))).limit(2);
            List<StockIndex> priceList = mongoTemplate.find(query, StockIndex.class);

            if(priceList.size() > 0) {
                batchLatestPriceList.add(convertStockIndexListToMap(priceList));
            }
        }

        return batchLatestPriceList;
    }

    private Map<String, Object> convertStockIndexListToMap(List<StockIndex> priceList) {
        Map<String, Object> priceMap = new HashMap<String, Object>();
        StockIndex latestPrice = priceList.get(0);
        StockIndex previousPrice = null;

        final BigDecimal percentage = new BigDecimal(100);

        BigDecimal change;
        BigDecimal changePercent;
        BigDecimal previousPriceBigDecimal = null;
        BigDecimal latestPriceBigDecimal = null;
        switch (priceList.size()) {
            case 1:
                previousPriceBigDecimal = new BigDecimal(latestPrice.getOpen().toString());
                latestPriceBigDecimal = new BigDecimal(latestPrice.getClose().toString());
                break;
            case 2:
                previousPrice = priceList.get(1);
                previousPriceBigDecimal = new BigDecimal(previousPrice.getClose().toString());
                latestPriceBigDecimal = new BigDecimal(latestPrice.getClose().toString());
                break;
        }
        change = latestPriceBigDecimal.subtract(previousPriceBigDecimal);
        changePercent = change.divide(previousPriceBigDecimal,4, RoundingMode.HALF_UP).multiply(percentage);
        priceMap.put("indexCode", latestPrice.getIndexCode());
        priceMap.put("date", latestPrice.getDate());
        priceMap.put("open", latestPrice.getOpen());
        priceMap.put("low", latestPrice.getLow());
        priceMap.put("high", latestPrice.getHigh());
        priceMap.put("close", latestPrice.getClose());
        priceMap.put("volume", latestPrice.getVolume());
        priceMap.put("change", change);
        priceMap.put("changePercent", changePercent);
        return priceMap;
    }


}

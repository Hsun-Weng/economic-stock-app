package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import com.hsun.data.bean.StockIndexPriceBean;
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
    public List<StockIndexPriceBean> getStockIndexByCodeAndDateBetween(String indexCode, Date startDate,
                                                                       Date endDate) {
        // 設置查詢起訖時間移至最早 & 最晚
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByIndexCodeAndDateBetween(indexCode, queryStartDate, queryEndDate)
                .stream()
                .map((price)-> StockIndexPriceBean.builder()
                        .date(price.getDate())
                        .indexCode(price.getIndexCode())
                        .open(price.getOpen())
                        .low(price.getLow())
                        .high(price.getHigh())
                        .close(price.getClose())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<StockIndexPriceBean> getBatchLatestPriceList(List<String> indexCodeList) {
        List<StockIndexPriceBean> batchLatestPriceList = new ArrayList<>(indexCodeList.size());

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

    private StockIndexPriceBean convertStockIndexListToMap(List<StockIndex> priceList) {
        StockIndex price = priceList.get(0);
        StockIndex previousPrice = null;

        final BigDecimal percentage = new BigDecimal(100);

        BigDecimal change;
        BigDecimal changePercent;
        BigDecimal previousPriceBigDecimal = null;
        BigDecimal latestPriceBigDecimal = null;
        switch (priceList.size()) {
            case 1:
                previousPriceBigDecimal = new BigDecimal(price.getOpen().toString());
                latestPriceBigDecimal = new BigDecimal(price.getClose().toString());
                break;
            case 2:
                previousPrice = priceList.get(1);
                previousPriceBigDecimal = new BigDecimal(previousPrice.getClose().toString());
                latestPriceBigDecimal = new BigDecimal(price.getClose().toString());
                break;
        }
        change = latestPriceBigDecimal.subtract(previousPriceBigDecimal);
        changePercent = change.divide(previousPriceBigDecimal,4, RoundingMode.HALF_UP)
                .multiply(percentage);

        return StockIndexPriceBean.builder()
                .date(price.getDate())
                .indexCode(price.getIndexCode())
                .open(price.getOpen())
                .low(price.getLow())
                .high(price.getHigh())
                .close(price.getClose())
                .change(change.floatValue())
                .changePercent(changePercent.floatValue())
                .build();
    }


}

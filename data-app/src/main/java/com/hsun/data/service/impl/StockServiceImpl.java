package com.hsun.data.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.hsun.data.entity.Stock;
import com.hsun.data.repository.StockRepository;
import com.hsun.data.service.StockService;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private StockRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Stock> getStockByCodeAndDateBetween(String stockCode, Date startDate, Date endDate) {
        LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryStartDate = Date.from(localStartDate.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        LocalDate localEndDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date queryEndDate = Date.from(localEndDate.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByStockCodeAndDateBetween(stockCode, queryStartDate, queryEndDate);
    }

    @Override
    public List<Stock> getBatchLatestPriceList(List<String> stockCodeList) {
        List<Stock> batchLatestPriceList = new ArrayList<Stock>(stockCodeList.size());

        Query query = null;
        
        for(String stockCode : stockCodeList){
            query = new Query(Criteria.where("stock_code").is(stockCode))
                    .with(Sort.by(Sort.Order.desc("date"))).limit(1);

            batchLatestPriceList.add(mongoTemplate.findOne(query, Stock.class));
        }

        return batchLatestPriceList;
    }

    @Override
    public Page<Stock> getStockSortedPage(PageRequest pageRequest) {
        LocalDate today = LocalDate.now().minusDays(1);
        Date queryStartDate = Date.from(today.atTime(0, 0, 0).atZone(ZoneId.systemDefault()).toInstant());
        Date queryEndDate = Date.from(today.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());
        return repository.findByDateBetween(queryStartDate, queryEndDate, pageRequest);
    }
}

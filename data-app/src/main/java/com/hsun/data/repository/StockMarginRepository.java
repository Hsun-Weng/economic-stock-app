package com.hsun.data.repository;

import com.hsun.data.entity.StockMargin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockMarginRepository extends MongoRepository<StockMargin, String>{
    List<StockMargin> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
}

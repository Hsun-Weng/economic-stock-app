package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.Stock;

@Repository
public interface StockRepository extends MongoRepository<Stock, String>{
    @Query("{ 'stockCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<Stock> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
}

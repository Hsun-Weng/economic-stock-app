package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.TaiwanStock;

@Repository
public interface TaiwanStockRepository extends MongoRepository<TaiwanStock, String>{
    @Query("{ 'stockCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    public List<TaiwanStock> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
}

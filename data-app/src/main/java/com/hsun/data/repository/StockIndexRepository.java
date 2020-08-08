package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.StockIndex;

@Repository
public interface StockIndexRepository extends MongoRepository<StockIndex, String> {
    @Query("{ 'indexCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<StockIndex> findByIndexCodeAndDateBetween(String indexCode, Date startDate, Date endDate);
}

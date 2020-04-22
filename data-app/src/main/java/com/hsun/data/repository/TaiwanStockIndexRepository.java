package com.hsun.data.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.TaiwanStockIndex;

@Repository
public interface TaiwanStockIndexRepository extends MongoRepository<TaiwanStockIndex, String> {
    @Query("{ 'indexCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<TaiwanStockIndex> findByIndexCodeAndDateBetween(String indexCode, Date startDate, Date endDate);
}

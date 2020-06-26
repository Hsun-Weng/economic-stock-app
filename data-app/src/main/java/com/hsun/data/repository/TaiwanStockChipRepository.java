package com.hsun.data.repository;

import com.hsun.data.entity.TaiwanStockChip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TaiwanStockChipRepository extends MongoRepository<TaiwanStockChip, String>{
    @Query("{ 'stockCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<TaiwanStockChip> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
}

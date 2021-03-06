package com.hsun.data.repository;

import com.hsun.data.entity.StockChip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockChipRepository extends MongoRepository<StockChip, String>{
    List<StockChip> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
}

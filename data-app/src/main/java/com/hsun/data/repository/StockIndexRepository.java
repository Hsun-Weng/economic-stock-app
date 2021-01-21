package com.hsun.data.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.StockIndex;

@Repository
public interface StockIndexRepository extends MongoRepository<StockIndex, String> {
    List<StockIndex> findByIndexCodeAndDateBetween(String indexCode, Date startDate, Date endDate);
    Optional<StockIndex> findFirstByIndexCodeOrderByDateDesc(String indexCode);
    Optional<StockIndex> findFirstByOrderByDateDesc();
    List<StockIndex> findByIndexCodeInAndDateBetween(List<String> indexCodeList, Date startDate, Date endDate);
}

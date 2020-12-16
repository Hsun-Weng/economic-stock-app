package com.hsun.data.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.hsun.data.entity.Stock;

@Repository
public interface StockRepository extends PagingAndSortingRepository<Stock, String> {
    @Query("{ 'stockCode': ?0, 'date': { $gte: ?1, $lte: ?2} }")
    List<Stock> findByStockCodeAndDateBetween(String stockCode, Date startDate, Date endDate);
    Page<Stock> findByDateBetween(Date startDate, Date endDate, Pageable pageable);
    Optional<Stock> findFirstByOrderByDateDesc();
    Optional<Stock> findFirstByStockCodeOrderByDateDesc(String stockCode);
    List<Stock> findByStockCodeInAndDateBetween(List<String> stockCodeList, Date startDate, Date endDate);
}

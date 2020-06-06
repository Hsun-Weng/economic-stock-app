package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.TaiwanStock;

import java.util.Optional;

@Repository
public interface TaiwanStockRepository extends JpaRepository<TaiwanStock, Integer>{
    @Query("SELECT tf FROM TaiwanStock tf WHERE tf.stockCode= ?1")
    Optional<TaiwanStock> findByStockCode(String stockCode);
}

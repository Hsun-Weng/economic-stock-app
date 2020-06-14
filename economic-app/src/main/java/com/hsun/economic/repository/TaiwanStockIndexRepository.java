package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hsun.economic.entity.TaiwanStockIndex;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TaiwanStockIndexRepository extends JpaRepository<TaiwanStockIndex, Integer>{
    @Query("SELECT tf FROM TaiwanStockIndex tf WHERE tf.indexCode= ?1")
    Optional<TaiwanStockIndex> findByIndexCode(String indexCode);
}

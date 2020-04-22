package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hsun.economic.entity.TaiwanFutures;

public interface TaiwanFuturesRepository extends JpaRepository<TaiwanFutures, Integer>{

    @Query("SELECT tf FROM TaiwanFutures tf WHERE tf.futuresCode= ?1")
    TaiwanFutures findByFuturesCode(String futuresCode);
}

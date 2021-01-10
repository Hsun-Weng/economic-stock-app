package com.hsun.economic.repository;

import com.hsun.economic.entity.StockProportion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockProportionRepository extends JpaRepository<StockProportion, Integer> {

}

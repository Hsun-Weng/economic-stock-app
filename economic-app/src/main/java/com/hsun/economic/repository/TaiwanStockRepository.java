package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.TaiwanStock;

@Repository
public interface TaiwanStockRepository extends JpaRepository<TaiwanStock, Integer>{

}

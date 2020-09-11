package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hsun.economic.entity.StockIndex;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StockIndexRepository extends JpaRepository<StockIndex, String>{
}

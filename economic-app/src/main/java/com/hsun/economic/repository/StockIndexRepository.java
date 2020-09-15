package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hsun.economic.entity.StockIndex;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockIndexRepository extends JpaRepository<StockIndex, String>{
}

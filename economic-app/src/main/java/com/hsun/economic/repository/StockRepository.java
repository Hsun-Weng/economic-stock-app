package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.Stock;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, String>{
}

package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.CategoryStock;

@Repository
public interface CategoryStockRepository extends JpaRepository<CategoryStock, Integer>{
    
}

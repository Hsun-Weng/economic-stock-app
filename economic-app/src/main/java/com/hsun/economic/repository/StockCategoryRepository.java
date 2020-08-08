package com.hsun.economic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.StockCategory;

@Repository
public interface StockCategoryRepository extends JpaRepository<StockCategory, String>{
}

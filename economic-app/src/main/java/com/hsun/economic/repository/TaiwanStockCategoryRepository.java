package com.hsun.economic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hsun.economic.entity.TaiwanStockCategory;

@Repository
public interface TaiwanStockCategoryRepository extends JpaRepository<TaiwanStockCategory, Integer>{
    @Query("SELECT e FROM TaiwanStockCategory e WHERE e.categoryCode = ?1")
    List<TaiwanStockCategory> findByCategoryCode(String categoryCode);
}

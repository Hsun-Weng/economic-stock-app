package com.hsun.economic.repository;

import com.hsun.economic.entity.StockCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface StockCategoryRepository extends JpaRepository<StockCategory, String>{

    @Query(value = "SELECT s.stock_code stockCode, " +
            "s.stock_name name, " +
            "sp.proportion " +
            "FROM stock s, category_stock cs, stock_proportion sp " +
            "WHERE cs.category_code = :categoryCode " +
            "AND s.stock_code = sp.stock_code " +
            "AND s.stock_code = cs.stock_code " +
            "ORDER BY proportion DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<Map<String, Object>> findByCategoryCodeOrderByProportionDescLimited(@Param("categoryCode") String categoryCode, @Param("limit") Integer limit);
}

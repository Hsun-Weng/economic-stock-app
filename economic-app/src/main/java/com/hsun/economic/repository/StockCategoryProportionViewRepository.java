package com.hsun.economic.repository;

import com.hsun.economic.entity.StockCategoryProportionView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockCategoryProportionViewRepository extends JpaRepository<StockCategoryProportionView, String> {
}

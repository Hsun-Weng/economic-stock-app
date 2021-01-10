package com.hsun.economic.repository;

import com.hsun.economic.entity.StockProportionView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockProportionViewRepository extends PagingAndSortingRepository<StockProportionView, String> {
    Page<StockProportionView> findByCategoryCode(String categoryCode, Pageable pageable);
}

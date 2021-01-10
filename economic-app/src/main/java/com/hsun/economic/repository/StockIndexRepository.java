package com.hsun.economic.repository;

import com.hsun.economic.entity.StockIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockIndexRepository extends JpaRepository<StockIndex, String>{
    List<StockIndex> findByIndexCodeIn(List<String> indexCodeList);
}

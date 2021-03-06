package com.hsun.economic.repository;

import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.PortfolioProductPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioProductRepository extends JpaRepository<PortfolioProduct, PortfolioProductPK> {

}

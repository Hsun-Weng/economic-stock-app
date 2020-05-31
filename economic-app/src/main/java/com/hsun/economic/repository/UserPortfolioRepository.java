package com.hsun.economic.repository;

import com.hsun.economic.entity.UserPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPortfolioRepository extends JpaRepository<UserPortfolio, Integer> {
}

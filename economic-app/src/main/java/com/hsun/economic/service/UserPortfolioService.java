package com.hsun.economic.service;

import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.UserPortfolio;

import java.util.List;

public interface UserPortfolioService {
    void addPortfolio(String userName, UserPortfolio userPortfolio);
    List<PortfolioProduct> findUserPortfolioProductList(String userName, Integer portfolioId);
}

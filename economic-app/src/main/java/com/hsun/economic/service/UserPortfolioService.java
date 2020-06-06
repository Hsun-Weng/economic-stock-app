package com.hsun.economic.service;

import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.UserPortfolio;

public interface UserPortfolioService {
    void addPortfolio(String userName, UserPortfolio userPortfolio);
    void addPortfolioProduct(String userName, PortfolioProduct portfolioProduct);
}

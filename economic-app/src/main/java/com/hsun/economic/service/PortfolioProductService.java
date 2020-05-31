package com.hsun.economic.service;

import com.hsun.economic.entity.PortfolioProduct;

import java.util.List;

public interface PortfolioProductService {
    void savePortfolioProducts(String userName, Integer portfolioId, List<PortfolioProduct> portfolioProductList);
}

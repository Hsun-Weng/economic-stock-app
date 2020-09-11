package com.hsun.economic.service;

import com.hsun.economic.entity.PortfolioProduct;

import java.util.List;

public interface PortfolioProductService {
    void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProduct portfolioProduct);
    void savePortfolioProducts(String userName, Integer portfolioId, List<PortfolioProduct> portfolioProductList);
}

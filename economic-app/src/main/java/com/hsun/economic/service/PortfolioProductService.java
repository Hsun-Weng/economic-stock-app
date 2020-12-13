package com.hsun.economic.service;

import com.hsun.economic.bean.PortfolioProductBean;

import java.util.List;

public interface PortfolioProductService {
    void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProductBean portfolioProductBean);
    void savePortfolioProducts(String userName, Integer portfolioId, List<PortfolioProductBean> portfolioProductList);
    void deletePortfolioProduct(String userName, Integer portfolioId, Integer productType, String productCode);
}

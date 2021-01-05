package com.hsun.economic.service;

import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductBean;
import com.hsun.economic.bean.ProductPriceBean;

import java.util.List;

public interface PortfolioProductService {
    List<ProductBean> getProductList();
    void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProductBean portfolioProductBean);
    void savePortfolioProducts(String userName, Integer portfolioId, List<PortfolioProductBean> portfolioProductList);
    List<ProductPriceBean> getProductPriceList(String userName, Integer portfolioId);
}

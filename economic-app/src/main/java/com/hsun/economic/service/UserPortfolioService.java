package com.hsun.economic.service;

import com.hsun.economic.bean.PortfolioBean;
import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductPriceBean;

import java.util.List;

public interface UserPortfolioService {
    List<PortfolioBean> getPortfolioList(String userName);
    void addPortfolio(String userName, PortfolioBean portfolioBean);
    void deletePortfolio(String userName, Integer portfolioId);
    void updatePortfolio(String userName, Integer portfolioId, PortfolioBean portfolioBean);
    List<PortfolioProductBean> getProductList(String userName, Integer portfolioId);
    List<ProductPriceBean> getProductPriceList(String userName, Integer portfolioId);
}

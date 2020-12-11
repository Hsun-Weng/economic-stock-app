package com.hsun.economic.service;

import com.hsun.economic.bean.PortfolioBean;
import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.entity.UserPortfolio;

import java.util.List;

public interface UserPortfolioService {
    List<PortfolioBean> getPortfolioList(String userName);
    void addPortfolio(String userName, UserPortfolio userPortfolio);
    void deletePortfolio(String userName, Integer portfolioId);
    void updatePortfolio(String userName, Integer portfolioId, UserPortfolio userPortfolio);
    List<PortfolioProductBean> getProductList(String userName, Integer portfolioId);
}

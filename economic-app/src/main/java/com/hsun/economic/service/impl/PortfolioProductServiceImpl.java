package com.hsun.economic.service.impl;

import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.PortfolioProductRepository;
import com.hsun.economic.repository.UserPortfolioRepository;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioProductServiceImpl implements PortfolioProductService {

    @Autowired
    private PortfolioProductRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPortfolioRepository userPortfolioRepository;

    @Override
    public void savePortfolioProducts(String userName, Integer portfolioId
            , List<PortfolioProduct> portfolioProductList) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        user.getUserPortfolioList().stream().filter((userPortfolio->userPortfolio.getPortfolioId().equals(portfolioId))).findAny().orElseThrow(()->new ApiClientException("Portfolio not found."));

        repository.saveAll(portfolioProductList);
    }
}

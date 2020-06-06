package com.hsun.economic.service.impl;

import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.PortfolioProductRepository;
import com.hsun.economic.repository.UserPortfolioRepository;
import com.hsun.economic.repository.UserRepository;
import com.hsun.economic.service.UserPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPortfolioServiceImpl implements UserPortfolioService {

    @Autowired
    private UserPortfolioRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioProductRepository portfolioProductRepository;

    @Override
    public void addPortfolio(String userName, UserPortfolio userPortfolio) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        userPortfolio.setUserId(user.getId());
        repository.save(userPortfolio);
    }

    @Override
    public void addPortfolioProduct(String userName, PortfolioProduct portfolioProduct) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = repository.findById(portfolioProduct.getPortfolioId()).orElseThrow(()->new ApiClientException("Portfolio not found."));
        Integer maxSort = userPortfolio.getPortfolioProductList()
                .stream()
                .mapToInt(PortfolioProduct::getSort).sum();
        portfolioProduct.setSort(maxSort+1);
        portfolioProductRepository.save(portfolioProduct);
    }
}

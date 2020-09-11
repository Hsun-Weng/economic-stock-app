package com.hsun.economic.service.impl;

import com.hsun.economic.entity.*;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.*;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PortfolioProductServiceImpl implements PortfolioProductService {

    @Autowired
    private PortfolioProductRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProduct portfolioProduct) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList().stream()
                .filter((portfolio->portfolio.getPortfolioId()
                        .equals(portfolioId))).findFirst()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

        portfolioProduct.getId().setPortfolioId(portfolioId);
        Integer maxSort = userPortfolio.getPortfolioProductList()
                .stream()
                .mapToInt(PortfolioProduct::getSort).max().orElse(0);
        portfolioProduct.setSort(maxSort+1);
        repository.save(portfolioProduct);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void savePortfolioProducts(String userName, Integer portfolioId
            , List<PortfolioProduct> portfolioProductList) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        user.getUserPortfolioList().stream()
                .filter((userPortfolio->userPortfolio.getPortfolioId()
                        .equals(portfolioId))).findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

        List<PortfolioProduct> entityList = portfolioProductList.stream()
                .map((portfolioProduct)->{
                    portfolioProduct.getId().setPortfolioId(portfolioId);
                    return portfolioProduct;
                }).collect(Collectors.toList());

        repository.saveAll(entityList);
    }
}

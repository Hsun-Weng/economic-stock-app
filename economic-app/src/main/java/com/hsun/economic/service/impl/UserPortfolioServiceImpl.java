package com.hsun.economic.service.impl;

import com.hsun.economic.entity.*;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.*;
import com.hsun.economic.service.UserPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPortfolioServiceImpl implements UserPortfolioService {

    @Autowired
    private UserPortfolioRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioProductRepository portfolioProductRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockIndexRepository stockIndexRepository;

    @Override
    public void addPortfolio(String userName, UserPortfolio userPortfolio) {
        userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        userPortfolio.setUserName(userName);
        if(StringUtils.isEmpty(userPortfolio.getPortfolioName())){
            throw new ApiClientException("Portfolio name can't be empty.");
        }
        repository.save(userPortfolio);
    }

    @Override
    public List<PortfolioProduct> findUserPortfolioProductList(String userName, Integer portfolioId) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream().filter((data)->data.getPortfolioId() == portfolioId)
                .findAny().orElseThrow(()->new ApiClientException("Portfolio not found."));

        return userPortfolio.getPortfolioProductList()
                .stream().map((portfolioProduct)->{
                    String productCode = null;
                    switch(portfolioProduct.getId().getProductType()){
                        case 0: //index
                            StockIndex stockIndex = stockIndexRepository.findById(portfolioProduct.getId().getProductCode())
                                    .orElse(new StockIndex());
                            portfolioProduct.setProductCode(stockIndex.getIndexCode());
                            portfolioProduct.setProductName(stockIndex.getIndexName());
                            break;
                        case 1: //stock
                            Stock stock = stockRepository.findById(portfolioProduct.getId().getProductCode())
                                    .orElse(new Stock());
                            portfolioProduct.setProductCode(stock.getStockCode());
                            portfolioProduct.setProductName(stock.getStockName());
                            break;
                        case 3: //futures
                            break;
                        default:
                            throw new ApiClientException("Can't add this product.");
                    }
                    return portfolioProduct;
                }).collect(Collectors.toList());
    }
}

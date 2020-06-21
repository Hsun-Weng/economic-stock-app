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

    @Autowired
    private UserPortfolioRepository userPortfolioRepository;

    @Autowired
    private TaiwanStockIndexRepository stockIndexRepository;

    @Autowired
    private TaiwanStockRepository stockRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void savePortfolioProducts(String userName, Integer portfolioId
            , List<PortfolioProduct> portfolioProductList) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        user.getUserPortfolioList().stream()
                .filter((userPortfolio->userPortfolio.getPortfolioId()
                        .equals(portfolioId))).findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

        List<PortfolioProduct> entity = portfolioProductList.stream()
                .map((portfolioProduct)->{
                    PortfolioProductPK id = portfolioProduct.getId();
                    id.setPortfolioId(portfolioId);
                    switch(portfolioProduct.getId().getProductType()){
                        case 0: //index
                            TaiwanStockIndex stockIndex = stockIndexRepository.findByIndexCode(portfolioProduct.getProductCode())
                                    .orElse(new TaiwanStockIndex());
                            id.setProductId(stockIndex.getIndexId());
                            id.setProductType(0);
                            break;
                        case 1: //stock
                            TaiwanStock stock = stockRepository.findByStockCode(portfolioProduct.getProductCode())
                                    .orElse(new TaiwanStock());
                            id.setProductId(stock.getStockId());
                            id.setProductType(1);
                            break;
                        case 3: //futures
                            break;
                        default:
                            throw new ApiClientException("Couldn't update products.");
                    }
                    portfolioProduct.setId(id);
                    return portfolioProduct;
                }).collect(Collectors.toList());

        repository.saveAll(portfolioProductList);
    }
}

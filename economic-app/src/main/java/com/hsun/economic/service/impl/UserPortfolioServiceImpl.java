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
    private TaiwanStockRepository stockRepository;

    @Autowired
    private TaiwanStockIndexRepository stockIndexRepository;

    @Override
    public void addPortfolio(String userName, UserPortfolio userPortfolio) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        userPortfolio.setUserId(user.getId());
        if(StringUtils.isEmpty(userPortfolio.getPortfolioName())){
            throw new ApiClientException("Portfolio name can't be empty.");
        }
        repository.save(userPortfolio);
    }

    @Override
    public void addPortfolioProduct(String userName, PortfolioProduct portfolioProduct) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = repository.findById(portfolioProduct.getId().getPortfolioId())
                .orElseThrow(()->new ApiClientException("Portfolio not found."));
        Integer productId = null;
        switch(portfolioProduct.getId().getProductType()){
            case 0: //index
                productId = stockIndexRepository.findByIndexCode(portfolioProduct.getProductCode())
                        .orElseThrow(()->new ApiClientException("Stock not found.")).getIndexId();
                break;
            case 1: //stock
                productId = stockRepository.findByStockCode(portfolioProduct.getProductCode())
                        .orElseThrow(()->new ApiClientException("Stock not found.")).getStockId();
                break;
            case 3: //futures
                break;
            default:
                throw new ApiClientException("Can't add this product.");
        }
        portfolioProduct.getId().setPortfolioId(userPortfolio.getPortfolioId());
        portfolioProduct.getId().setProductId(productId);
        Integer maxSort = userPortfolio.getPortfolioProductList()
                .stream()
                .mapToInt(PortfolioProduct::getSort).max().orElse(0);
        portfolioProduct.setSort(maxSort+1);
        portfolioProductRepository.save(portfolioProduct);
    }

    @Override
    public List<PortfolioProduct> findUserPortfolioProductList(String userName, Integer portfolioId) {
        User user = userRepository.findByName(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream().filter((data)->data.getPortfolioId() == portfolioId)
                .findAny().orElseThrow(()->new ApiClientException("Portfolio not found."));

        return userPortfolio.getPortfolioProductList()
                .stream().map((portfolioProduct)->{
                    String productCode = null;
                    switch(portfolioProduct.getId().getProductType()){
                        case 0: //index
                            TaiwanStockIndex stockIndex = stockIndexRepository.findById(portfolioProduct.getId().getProductId())
                                    .orElse(new TaiwanStockIndex());
                            portfolioProduct.setProductCode(stockIndex.getIndexCode());
                            portfolioProduct.setProductName(stockIndex.getIndexName());
                            break;
                        case 1: //stock
                            TaiwanStock stock = stockRepository.findById(portfolioProduct.getId().getProductId())
                                    .orElse(new TaiwanStock());
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

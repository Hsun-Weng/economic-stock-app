package com.hsun.economic.service.impl;

import com.hsun.economic.bean.*;
import com.hsun.economic.constants.ProductType;
import com.hsun.economic.entity.*;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.ResourceNotFoundException;
import com.hsun.economic.repository.*;
import com.hsun.economic.resource.StockIndexResource;
import com.hsun.economic.resource.StockResource;
import com.hsun.economic.service.UserPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.*;
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

    @Autowired
    private StockResource stockResource;

    @Autowired
    private StockIndexResource stockIndexResource;

    @Override
    public List<PortfolioBean> getPortfolioList(String userName) {
        return userRepository.findById(userName)
                .get()
                .getUserPortfolioList()
                .stream()
                .map((userPortfolio ->
                        new PortfolioBean(userPortfolio.getPortfolioId(), userPortfolio.getPortfolioName())))
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void addPortfolio(String userName, PortfolioBean portfolioBean) {
        if(StringUtils.isEmpty(portfolioBean.getPortfolioName())){
            throw new ApiClientException("名稱不得為空");
        }
        UserPortfolio userPortfolio = new UserPortfolio();
        userPortfolio.setUserName(userName);
        userPortfolio.setPortfolioName(portfolioBean.getPortfolioName());
        repository.save(userPortfolio);
    }

    @Transactional
    @Override
    public void deletePortfolio(String userName, Integer portfolioId) {
        UserPortfolio userPortfolio = repository.findById(portfolioId)
                .orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));
        if(!userPortfolio.getUserName().equals(userName)){
            throw new ResourceNotFoundException("投資組合不存在");
        }
        repository.delete(userPortfolio);
    }

    @Override
    public void updatePortfolio(String userName, Integer portfolioId, PortfolioBean portfolioBean) {
        User user = userRepository.findById(userName).get();
        UserPortfolio userPortfolio= user.getUserPortfolioList()
                .stream().filter((data)->data.getPortfolioId().equals(portfolioId))
                .findAny().orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));
        if(StringUtils.isEmpty(portfolioBean.getPortfolioName())){
            throw new ApiClientException("名稱不得為空");
        }
        userPortfolio.setPortfolioName(portfolioBean.getPortfolioName());
        repository.save(userPortfolio);
    }

    @Override
    public List<PortfolioProductBean> getProductList(String userName, Integer portfolioId) {
        User user = userRepository.findById(userName)
                .orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream()
                .filter((data)->data.getPortfolioId().equals(portfolioId))
                .findAny()
                .orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));

        return userPortfolio.getPortfolioProductList()
                .stream()
                .map((portfolioProduct)->{
                    String productName = null;
                    switch(ProductType.fromValue(portfolioProduct.getId().getProductType())){
                        case INDEX:
                            StockIndex stockIndex = stockIndexRepository.findById(portfolioProduct.getId().getProductCode())
                                    .orElse(new StockIndex());
                            productName = stockIndex.getIndexName();
                            break;
                        case STOCK:
                            Stock stock = stockRepository.findById(portfolioProduct.getId().getProductCode())
                                    .orElse(new Stock());
                            productName = stock.getStockName();
                            break;
                        case FUTURES:
                            break;
                    }
                    return PortfolioProductBean
                            .builder()
                            .productType(portfolioProduct.getId().getProductType())
                            .productCode(portfolioProduct.getId().getProductCode())
                            .productName(productName)
                            .sort(portfolioProduct.getSort())
                            .build();
                }).collect(Collectors.toList());
    }

    @Override
    public List<ProductPriceBean> getProductPriceList(String userName, Integer portfolioId) {
        User user = userRepository.findById(userName)
                .orElseThrow(()->new ResourceNotFoundException("找不到此用戶"));
        System.out.println(user.getUserPortfolioList());
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream()
                .filter((data)->data.getPortfolioId().equals(portfolioId))
                .findAny()
                .orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));
        List<PortfolioProduct> portfolioProductList = userPortfolio.getPortfolioProductList();

        return portfolioProductList
                .parallelStream()
                .map((portfolioProduct -> {
                    PortfolioProductBean portfolioProductBean = null;
                    String productCode = portfolioProduct.getId().getProductCode();
                    String productName = null;
                    ProductType productType = ProductType.fromValue(portfolioProduct.getId().getProductType());
                    PriceBean priceBean = null;
                    switch(productType){
                        case INDEX:
                            productName = stockIndexRepository.findById(productCode).get().getIndexName();
                            priceBean = stockIndexResource.getLatestPrice(productCode)
                                    .getData();
                            break;
                        case STOCK:
                            productName = stockRepository.findById(productCode).get().getStockName();
                            priceBean = stockResource.getLatestPrice(productCode).getData();
                            break;
                        case FUTURES:
                            break;
                    }
                    return ProductPriceBean.builder()
                            .date(priceBean.getDate())
                            .productType(productType.getValue())
                            .productCode(productCode)
                            .productName(productName)
                            .open(priceBean.getOpen())
                            .low(priceBean.getLow())
                            .high(priceBean.getHigh())
                            .close(priceBean.getClose())
                            .volume(priceBean.getVolume())
                            .change(priceBean.getChange())
                            .changePercent(priceBean.getChangePercent())
                            .sort(portfolioProduct.getSort())
                            .build();
                }))
                .sorted(Comparator.comparing(ProductPriceBean::getSort))
                .collect(Collectors.toList());
    }
}

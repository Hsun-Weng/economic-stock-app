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
        if (StringUtils.isEmpty(portfolioBean.getPortfolioName())) {
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
                .orElseThrow(() -> new ResourceNotFoundException("投資組合不存在"));
        if (!userPortfolio.getUserName().equals(userName)) {
            throw new ResourceNotFoundException("投資組合不存在");
        }
        repository.delete(userPortfolio);
    }

    @Override
    public void updatePortfolio(String userName, Integer portfolioId, PortfolioBean portfolioBean) {
        User user = userRepository.findById(userName).get();
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream().filter((data) -> data.getPortfolioId().equals(portfolioId))
                .findAny().orElseThrow(() -> new ResourceNotFoundException("投資組合不存在"));
        if (StringUtils.isEmpty(portfolioBean.getPortfolioName())) {
            throw new ApiClientException("名稱不得為空");
        }
        userPortfolio.setPortfolioName(portfolioBean.getPortfolioName());
        repository.save(userPortfolio);
    }

    @Override
    public List<PortfolioPriceBean> getPortfolioPriceList(String userName) {
        User user = userRepository.findById(userName).get();
        List<UserPortfolio> userPortfolioList = user.getUserPortfolioList();
        Date today = new Date();
        return userPortfolioList
                .parallelStream()
                .map((userPortfolio) -> {
                    List<PortfolioProduct> portfolioProductList = userPortfolio.getPortfolioProductList();

                    List<String> stockCodeList = portfolioProductList
                            .parallelStream()
                            .filter((portfolioProduct) -> portfolioProduct.getId().getProductType()
                                    .equals(ProductType.STOCK.getValue()))
                            .map((portfolioProduct)->portfolioProduct.getId().getProductCode())
                            .collect(Collectors.toList());
                    if(stockCodeList.size()>0){
                        // batch get prices
                        List<StockPriceBean> stockLatestPriceList = stockResource.getLatestPriceList(stockCodeList);
                        // Calculate aggregation
                        PriceBean priceBean = stockLatestPriceList
                                .parallelStream()
                                .map((stockPriceBean)->(PriceBean)stockPriceBean)
                                .reduce((total, price)->{
                                    total.setOpen(total.getOpen()+price.getOpen());
                                    total.setLow(total.getLow()+price.getLow());
                                    total.setHigh(total.getHigh()+price.getHigh());
                                    total.setClose(total.getClose()+price.getClose());
                                    total.setChange(total.getChange()+price.getChange());
                                    return total;
                                }).get();
                        return PortfolioPriceBean.builder()
                                .portfolioId(userPortfolio.getPortfolioId())
                                .portfolioName(userPortfolio.getPortfolioName())
                                .date(today)
                                .open(priceBean.getOpen())
                                .low(priceBean.getLow())
                                .high(priceBean.getHigh())
                                .close(priceBean.getClose())
                                .change(priceBean.getChange())
                                .build();
                    }else{
                        return PortfolioPriceBean.builder()
                                .portfolioId(userPortfolio.getPortfolioId())
                                .portfolioName(userPortfolio.getPortfolioName())
                                .build();
                    }
                }).collect(Collectors.toList());
    }
}
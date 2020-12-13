package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PortfolioBean;
import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductPriceBean;
import com.hsun.economic.constants.ProductType;
import com.hsun.economic.entity.*;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.repository.*;
import com.hsun.economic.resource.StockIndexPriceResource;
import com.hsun.economic.resource.StockPriceResource;
import com.hsun.economic.service.UserPortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    private StockPriceResource stockPriceResource;

    @Autowired
    private StockIndexPriceResource stockIndexPriceResource;

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

    @Override
    public void addPortfolio(String userName, PortfolioBean portfolioBean) {
        if(StringUtils.isEmpty(portfolioBean.getPortfolioName())){
            throw new ApiClientException("Portfolio name can't be empty.");
        }
        UserPortfolio userPortfolio = new UserPortfolio();
        userPortfolio.setUserName(userName);
        userPortfolio.setPortfolioName(portfolioBean.getPortfolioName());
        repository.save(userPortfolio);
    }

    @Override
    public void deletePortfolio(String userName, Integer portfolioId) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream().filter((data)->data.getPortfolioId() == portfolioId)
                .findAny().orElseThrow(()->new ApiClientException("Portfolio not found."));
        repository.deleteById(portfolioId);
    }

    @Override
    public void updatePortfolio(String userName, Integer portfolioId, PortfolioBean portfolioBean) {
        User user = userRepository.findById(userName).get();
        UserPortfolio userPortfolio= user.getUserPortfolioList()
                .stream().filter((data)->data.getPortfolioId() == portfolioId)
                .findAny().orElseThrow(()->new ApiClientException("Portfolio not found."));
        if(StringUtils.isEmpty(portfolioBean.getPortfolioName())){
            throw new ApiClientException("Portfolio name can't be empty.");
        }
        userPortfolio.setPortfolioName(portfolioBean.getPortfolioName());
        repository.save(userPortfolio);
    }

    @Override
    public List<PortfolioProductBean> getProductList(String userName, Integer portfolioId) {
        User user = userRepository.findById(userName)
                .orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream()
                .filter((data)->data.getPortfolioId() == portfolioId)
                .findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

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
                .orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList()
                .stream()
                .filter((data)->data.getPortfolioId() == portfolioId)
                .findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));
        List<PortfolioProduct> portfolioProductList = userPortfolio.getPortfolioProductList();
        List<ProductPriceBean> priceBeanList = new ArrayList<>(portfolioProductList.size());
        Map<String, Integer> productSortMap = portfolioProductList.stream()
                .collect(Collectors.toMap((portfolioProduct -> portfolioProduct.getId().getProductCode()
                        ), PortfolioProduct::getSort));

        List<String> indexCodeList = portfolioProductList.stream().filter((portfolioProduct -> portfolioProduct.getId()
                .getProductType() == ProductType.INDEX.getValue())).map((portfolioProduct ->
                portfolioProduct.getId().getProductCode())).collect(Collectors.toList());

        List<String> stockCodeList = portfolioProductList.stream().filter((portfolioProduct -> portfolioProduct.getId()
                .getProductType() == ProductType.STOCK.getValue())).map((portfolioProduct ->
                portfolioProduct.getId().getProductCode())).collect(Collectors.toList());

        List<String> futuresCodeList = portfolioProductList.stream().filter((portfolioProduct -> portfolioProduct.getId()
                .getProductType() == ProductType.FUTURES.getValue())).map((portfolioProduct ->
                portfolioProduct.getId().getProductCode())).collect(Collectors.toList());

        priceBeanList.addAll(getStockIndexPriceList(indexCodeList));
        priceBeanList.addAll(getStockPriceList(stockCodeList));

        return priceBeanList.stream()
                .map((productPrice)->{
                    productPrice.setSort(productSortMap.get(productPrice.getProductCode()));
                    return productPrice;
                })
                .sorted(Comparator.comparing(ProductPriceBean::getSort))
                .collect(Collectors.toList());
    }

    private List<ProductPriceBean> getStockPriceList(List<String> stockCodeList){
        if(stockCodeList.size()==0) {
            return Collections.EMPTY_LIST;
        }
        Map<String, String> stockNameMap = stockRepository.findByStockCodeIn(stockCodeList).stream()
                .collect(Collectors.toMap(Stock::getStockCode, Stock::getStockName));

        return stockPriceResource.getBatchLatestPriceList(stockCodeList)
                .getData()
                .stream()
                .map((stockPrice)-> ProductPriceBean.builder()
                        .date(stockPrice.getDate())
                        .productType(ProductType.STOCK.getValue())
                        .productCode(stockPrice.getStockCode())
                        .productName(stockNameMap.get(stockPrice.getStockCode()))
                        .open(stockPrice.getOpen())
                        .low(stockPrice.getLow())
                        .high(stockPrice.getHigh())
                        .close(stockPrice.getClose())
                        .volume(stockPrice.getVolume())
                        .change(stockPrice.getChange())
                        .changePercent(stockPrice.getChangePercent())
                        .build()
                ).collect(Collectors.toList());
    }

    private List<ProductPriceBean> getStockIndexPriceList(List<String> indexCodeList){
        if(indexCodeList.size()==0) {
            return Collections.EMPTY_LIST;
        }
        Map<String, String> indexNameMap = stockIndexRepository.findByIndexCodeIn(indexCodeList).stream()
                .collect(Collectors.toMap(StockIndex::getIndexCode, StockIndex::getIndexName));

        return stockIndexPriceResource.getBatchLatestPriceList(indexCodeList)
                .getData()
                .stream()
                .map((indexPrice)-> ProductPriceBean.builder()
                        .date(indexPrice.getDate())
                        .productType(ProductType.INDEX.getValue())
                        .productCode(indexPrice.getIndexCode())
                        .productName(indexNameMap.get(indexPrice.getIndexCode()))
                        .open(indexPrice.getOpen())
                        .low(indexPrice.getLow())
                        .high(indexPrice.getHigh())
                        .close(indexPrice.getClose())
                        .volume(indexPrice.getVolume())
                        .change(indexPrice.getChange())
                        .changePercent(indexPrice.getChangePercent())
                        .build()
                ).collect(Collectors.toList());
    }
}

package com.hsun.economic.service.impl;

import com.hsun.economic.bean.*;
import com.hsun.economic.constants.ProductType;
import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.PortfolioProductPK;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.DuplicateException;
import com.hsun.economic.exception.ResourceNotFoundException;
import com.hsun.economic.repository.*;
import com.hsun.economic.resource.StockIndexResource;
import com.hsun.economic.resource.StockResource;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PortfolioProductServiceImpl implements PortfolioProductService {

    @Autowired
    private PortfolioProductRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPortfolioRepository userPortfolioRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockIndexRepository stockIndexRepository;

    @Autowired
    private StockResource stockResource;

    @Autowired
    private StockIndexResource stockIndexResource;

    @Override
    public List<ProductBean> getProductList() {
        List<ProductBean> stockProductList = stockRepository
                .findAll()
                .parallelStream()
                .map((stock)->new ProductBean(ProductType.STOCK.getValue(), stock.getStockCode()
                        , stock.getStockName()))
                .collect(Collectors.toList());

        List<ProductBean> stockIndexProductList = stockIndexRepository
                .findAll()
                .parallelStream()
                .map((stockIndex)->new ProductBean(ProductType.INDEX.getValue(), stockIndex.getIndexCode()
                        , stockIndex.getIndexName()))
                .collect(Collectors.toList());

        return Stream.concat(stockProductList.stream(), stockIndexProductList.stream())
                .collect(Collectors.toList());
    }

    @Override
    public void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProductBean portfolioProductBean) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList().stream()
                .filter((portfolio->portfolio.getPortfolioId()
                        .equals(portfolioId))).findFirst()
                .orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));

        PortfolioProduct portfolioProduct = new PortfolioProduct();
        portfolioProduct.setUserPortfolio(userPortfolio);
        PortfolioProductPK portfolioProductId = new PortfolioProductPK();
        portfolioProductId.setProductType(portfolioProductBean.getProductType());
        portfolioProductId.setProductCode(portfolioProductBean.getProductCode());

        Integer maxSort = userPortfolio.getPortfolioProductList()
                .stream()
                .mapToInt(PortfolioProduct::getSort).max().orElse(0);

        portfolioProduct.setId(portfolioProductId);
        portfolioProduct.setSort(++maxSort);
        try {
            repository.save(portfolioProduct);
        }catch(DataIntegrityViolationException e){
            throw new DuplicateException("已存在投資組合中");
        }
    }

    @Override
    @Transactional
    public void savePortfolioProducts(String userName, Integer portfolioId
            , List<PortfolioProductBean> portfolioProductBeanList) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("找不到用戶"));
        UserPortfolio userPortfolio = user.getUserPortfolioList().stream()
                .filter((entity->entity.getPortfolioId()
                        .equals(portfolioId))).findAny()
                .orElseThrow(()->new ResourceNotFoundException("投資組合不存在"));

        List<PortfolioProduct> portfolioProductList = portfolioProductBeanList
                .parallelStream()
                .map((portfolioProductBean -> {
                    PortfolioProductPK portfolioProductId = new PortfolioProductPK();
                    portfolioProductId.setPortfolioId(portfolioId);
                    portfolioProductId.setProductType(portfolioProductBean.getProductType());
                    portfolioProductId.setProductCode(portfolioProductBean.getProductCode());

                    Optional<PortfolioProduct> portfolioProductOptional = repository.findById(portfolioProductId);
                    if(!portfolioProductOptional.isPresent()){
                        return null;
                    }
                    PortfolioProduct portfolioProduct = portfolioProductOptional.get();
                    portfolioProduct.setUserPortfolio(userPortfolio);
                    portfolioProduct.setSort(portfolioProductBean.getSort());
                    return portfolioProduct;
                })).collect(Collectors.toList());
        userPortfolio.setPortfolioProductList(portfolioProductList);
        userPortfolioRepository.save(userPortfolio);
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

        List<String> indexCodeList = portfolioProductList
                .parallelStream()
                .filter((portfolioProduct) -> portfolioProduct.getId().getProductType()
                        .equals(ProductType.INDEX.getValue()))
                .map((portfolioProduct)->portfolioProduct.getId().getProductCode())
                .collect(Collectors.toList());

        List<String> stockCodeList = portfolioProductList
                .parallelStream()
                .filter((portfolioProduct) -> portfolioProduct.getId().getProductType()
                        .equals(ProductType.STOCK.getValue()))
                .map((portfolioProduct)->portfolioProduct.getId().getProductCode())
                .collect(Collectors.toList());
        // batch get prices
        List<StockIndexPriceBean> indexLatestPriceList = stockIndexResource.getLatestPriceList(indexCodeList);
        List<StockPriceBean> stockLatestPriceList = stockResource.getLatestPriceList(stockCodeList);

        return portfolioProductList
                .parallelStream()
                .map((portfolioProduct -> {
                    String productCode = portfolioProduct.getId().getProductCode();
                    String productName = null;
                    Optional<PriceBean> priceBeanOptional = null;
                    switch(ProductType.fromValue(portfolioProduct.getId().getProductType())){
                        case INDEX:
                            productName = stockIndexRepository.findById(productCode).get().getIndexName();
                            priceBeanOptional = indexLatestPriceList.stream()
                                    .filter((indexLatestPrice)->indexLatestPrice.getIndexCode().equals(productCode))
                                    .findAny()
                                    .map((indexLatestPrice)->(PriceBean)indexLatestPrice);
                            break;
                        case STOCK:
                            productName = stockRepository.findById(productCode).get().getStockName();
                            priceBeanOptional = stockLatestPriceList.stream()
                                    .filter((stockLatestPrice)->stockLatestPrice.getStockCode().equals(productCode))
                                    .findAny()
                                    .map((stockLatestPrice)->(PriceBean)stockLatestPrice);
                            break;
                        case FUTURES:
                            break;
                    }
                    if(priceBeanOptional.isPresent()){
                        PriceBean priceBean = priceBeanOptional.get();
                        return ProductPriceBean.builder()
                                .date(priceBean.getDate())
                                .productType(portfolioProduct.getId().getProductType())
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
                    }else{
                        return ProductPriceBean.builder()
                                .productType(portfolioProduct.getId().getProductType())
                                .productCode(productCode)
                                .productName(productName)
                                .sort(portfolioProduct.getSort())
                                .build();
                    }
                }))
                .sorted(Comparator.comparing(ProductPriceBean::getSort))
                .collect(Collectors.toList());
    }
}

package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PortfolioProductBean;
import com.hsun.economic.bean.ProductBean;
import com.hsun.economic.constants.ProductType;
import com.hsun.economic.entity.PortfolioProduct;
import com.hsun.economic.entity.PortfolioProductPK;
import com.hsun.economic.entity.User;
import com.hsun.economic.entity.UserPortfolio;
import com.hsun.economic.exception.ApiClientException;
import com.hsun.economic.exception.DuplicateException;
import com.hsun.economic.exception.ResourceNotFoundException;
import com.hsun.economic.repository.*;
import com.hsun.economic.service.PortfolioProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}

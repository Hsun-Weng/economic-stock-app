package com.hsun.economic.service.impl;

import com.hsun.economic.bean.PortfolioProductBean;
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

    @Override
    public void addPortfolioProduct(String userName, Integer portfolioId, PortfolioProductBean portfolioProductBean) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList().stream()
                .filter((portfolio->portfolio.getPortfolioId()
                        .equals(portfolioId))).findFirst()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

        PortfolioProduct portfolioProduct = new PortfolioProduct();
        PortfolioProductPK portfolioProductId = new PortfolioProductPK();
        portfolioProductId.setPortfolioId(portfolioId);
        portfolioProductId.setProductType(portfolioProductBean.getProductType());
        portfolioProductId.setProductCode(portfolioProductBean.getProductCode());

        Integer maxSort = userPortfolio.getPortfolioProductList()
                .stream()
                .mapToInt(PortfolioProduct::getSort).max().orElse(0);

        portfolioProduct.setId(portfolioProductId);
        portfolioProduct.setSort(++maxSort);
        repository.save(portfolioProduct);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void savePortfolioProducts(String userName, Integer portfolioId
            , List<PortfolioProductBean> portfolioProductBeanList) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        UserPortfolio userPortfolio = user.getUserPortfolioList().stream()
                .filter((entity->entity.getPortfolioId()
                        .equals(portfolioId))).findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));
        List<PortfolioProduct> portfolioProductList = portfolioProductBeanList
                .parallelStream()
                .map((portfolioProductBean -> {
                    PortfolioProduct portfolioProduct = new PortfolioProduct();
                    PortfolioProductPK portfolioProductId = new PortfolioProductPK();
                    portfolioProductId.setPortfolioId(portfolioId);
                    portfolioProductId.setProductType(portfolioProductBean.getProductType());
                    portfolioProductId.setProductCode(portfolioProductBean.getProductCode());
                    portfolioProduct.setSort(portfolioProductBean.getSort());
                    portfolioProduct.setId(portfolioProductId);
                    return portfolioProduct;
                })).collect(Collectors.toList());
        userPortfolio.setPortfolioProductList(portfolioProductList);
        userPortfolioRepository.save(userPortfolio);
    }

    @Override
    public void deletePortfolioProduct(String userName, Integer portfolioId, Integer productType, String productCode) {
        User user = userRepository.findById(userName).orElseThrow(()->new ApiClientException("User not found."));
        user.getUserPortfolioList().stream()
                .filter((userPortfolio->userPortfolio.getPortfolioId()
                        .equals(portfolioId))).findAny()
                .orElseThrow(()->new ApiClientException("Portfolio not found."));

        PortfolioProductPK portfolioProductPK = new PortfolioProductPK();
        portfolioProductPK.setPortfolioId(portfolioId);
        portfolioProductPK.setProductType(productType);
        portfolioProductPK.setProductCode(productCode);

        repository.deleteById(portfolioProductPK);
    }
}

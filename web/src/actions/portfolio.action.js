import portfolioConstants from '../constants/portfolio.constants';
import { portfolioService } from '../services';
import { stockService } from '../services';

import { notificationActions } from './';

import arrayMove from 'array-move';

export const portfolioAction = {
    getPortfolio,
    addPortfolio,
    deletePortfolio,
    updatePortfolio,
    getPortfolioProducts,
    addPortfolioProduct,
    deletePortfolioProducts,
    getLatestProductPrice,
    resortPortfolioProducts
}

function getPortfolio() {
    return dispatch => {
        dispatch(request());

        portfolioService.getPortfolio()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_SUCCESS, data } }
    function failure() { return { type: portfolioConstants.GET_PORTFOLIO_FAILURE } }
}

function addPortfolio(portfolio) {
    return dispatch => {
        dispatch(request());

        portfolioService.addPortfolio(portfolio)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
                dispatch(notificationActions.enqueueSuccess(`新增成功：投資組合 ${portfolio.portfolioName}`))
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.ADD_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.ADD_PORTFOLIO_SUCCESS } }
    function failure() { return { type: portfolioConstants.ADD_PORTFOLIO_FAILURE } }
}

function deletePortfolio(portfolioId) {
    return dispatch => {
        dispatch(request());

        portfolioService.deletePortfolio(portfolioId)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
                dispatch(notificationActions.enqueueSuccess(`刪除成功`))
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.DELETE_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.DELETE_PORTFOLIO_SUCCESS } }
    function failure() { return { type: portfolioConstants.DELETE_PORTFOLIO_FAILURE } }
}

function updatePortfolio(portfolioId, portfolio) {
    return dispatch => {
        dispatch(request());

        portfolioService.updatePortfolio(portfolioId, portfolio)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
                dispatch(notificationActions.enqueueSuccess(`修改成功`))
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.UPDATE_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.UPDATE_PORTFOLIO_SUCCESS } }
    function failure() { return { type: portfolioConstants.UPDATE_PORTFOLIO_FAILURE } }
}

function getPortfolioProducts(portfolioId) {
    return dispatch => {
        dispatch(request());

        portfolioService.getPortfolioProducts(portfolioId)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_SUCCESS, data } }
    function failure() { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_FAILURE } }
}

function addPortfolioProduct(portfolioId, portfolioProduct) {
    return dispatch => {
        dispatch(request());

        portfolioService.addPortfolioProduct(portfolioId, portfolioProduct)
            .then(()=>{
                dispatch(success());
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_REQUEST } }
    function success() { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_SUCCESS } }
    function failure() { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_FAILURE } }
}

function deletePortfolioProducts(portfolioId, portfolioProduct) {
    return dispatch => {
        dispatch(request());

        portfolioService.deletePortfolioProduct(portfolioId, portfolioProduct)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolioProducts(portfolioId));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.DELETE_PORTFOLIO_PRODUCT_REQUEST } }
    function success() { return { type: portfolioConstants.DELETE_PORTFOLIO_PRODUCT_SUCCESS } }
    function failure() { return { type: portfolioConstants.DELETE_PORTFOLIO_PRODUCT_FAILURE } }
}

function getLatestProductPrice(portfolioProducts) {
    return dispatch => {
        let portfolioPorductPrices = [];

        let indexCodes = Object.assign([], portfolioProducts)
                    .filter((data)=>data.productType===0)
                    .map((data)=>data.productCode);

        let stockCodes = Object.assign([], portfolioProducts)
                        .filter((data)=>data.productType===1)
                        .map((data)=>data.productCode);
        
        dispatch(request());

        stockService.getLatestStockIndexPrice(indexCodes)
            .then(data=>{
                let stockIndexPrices = data.map((detail)=>{
                    return {...detail,
                        productCode: detail.indexCode,
                        productName: portfolioProducts.find((product)=>product.productCode===detail.indexCode).productName,
                        sort: portfolioProducts.find((product)=>product.productCode===detail.indexCode).sort,
                        productType: 0
                    };
                })
                portfolioPorductPrices = portfolioPorductPrices.concat(stockIndexPrices)
                    .sort((product1,product2)=>product1.sort-product2.sort);
                dispatch(success(portfolioPorductPrices))
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            });

        stockService.getLatestStockPrice(stockCodes)
            .then(data=>{
                    let stockPrices = data.map((detail)=>{
                        return {...detail,
                            productCode: detail.stockCode,
                            productName: portfolioProducts.find((product)=>product.productCode===detail.stockCode).productName,
                            sort: portfolioProducts.find((product)=>product.productCode===detail.stockCode).sort,
                            productType: 1
                        };
                    });
                    portfolioPorductPrices = portfolioPorductPrices.concat(stockPrices)
                        .sort((product1,product2)=>product1.sort-product2.sort);
                    dispatch(success(portfolioPorductPrices))
                },
                error=>{
                    dispatch(failure());
                    dispatch(notificationActions.enqueueError(error));
            });
        
    }

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_SUCCESS, data } }
    function failure() { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_FAILURE } }
}

function resortPortfolioProducts(portfolioId, portfolioProducts, oldIndex, newIndex) {
    return dispatch => {
        let resortedProducts = arrayMove(portfolioProducts, oldIndex, newIndex);
        let resortIndex = 0;
        let updateProducts = resortedProducts.map((product)=>{
            return {
                id: {
                    productType: product.productType,
                    productCode: product.productCode
                },
                sort: ++resortIndex
            };
        });

        dispatch(request());
        dispatch(success(resortedProducts));

        portfolioService.updatePortfolioProducts(portfolioId, updateProducts)
            .then(()=>{},
            error=>{
                dispatch(failure());
            })
    }

    function request() { return { type: portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_REQUEST } }
    function success(data) { return { type: portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_SUCCESS, data } }
    function failure() { return { type: portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_FAILURE } }
}
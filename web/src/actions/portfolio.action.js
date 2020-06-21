import portfolioConstants from '../constants/portfolio.constants';
import { portfolioService } from '../services';

export const portfolioAction = {
    getPortfolio,
    addPortfolio,
    getPortfolioProducts,
    addPortfolioProduct,
    updatePortfolioProducts
}

function getPortfolio() {
    return dispatch => {
        dispatch(request());

        portfolioService.getPortfolio()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_SUCCESS, data } }
    function failure(error) { return { type: portfolioConstants.GET_PORTFOLIO_FAILURE, error } }
}

function addPortfolio(portfolio) {
    return dispatch => {
        dispatch(request());

        portfolioService.addPortfolio(portfolio)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
            },
            error=>{
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.ADD_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.ADD_PORTFOLIO_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.ADD_PORTFOLIO_FAILURE, error } }
}

function getPortfolioProducts(portfolioId) {
    return dispatch => {
        dispatch(request());

        portfolioService.getPortfolioProducts(portfolioId)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_SUCCESS, data } }
    function failure(error) { return { type: portfolioConstants.GET_PORTFOLIO_PRODUCTS_FAILURE, error } }
}

function addPortfolioProduct(portfolioProduct) {
    return dispatch => {
        dispatch(request());

        portfolioService.addPortfolioProduct(portfolioProduct)
            .then(()=>{
                dispatch(success());
            },
            error=>{
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_REQUEST } }
    function success() { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.ADD_PORTFOLIO_PRODUCT_FAILURE, error } }
}

function updatePortfolioProducts(portfolioId, portfolioProducts) {
    return dispatch => {
        dispatch(request());

        portfolioService.updatePortfolioProducts(portfolioId, portfolioProducts)
            .then(()=>{
                dispatch(success());
            },
            error=>{
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_REQUEST } }
    function success() { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_FAILURE, error } }
}
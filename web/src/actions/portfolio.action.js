import portfolioConstants from '../constants/portfolio.constants';
import { portfolioService } from '../services';

import { notificationActions } from './';

export const portfolioAction = {
    getPortfolio,
    addPortfolio,
    deletePortfolio,
    updatePortfolio,
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
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
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

function updatePortfolioProducts(portfolioId, portfolioProducts) {
    return dispatch => {
        dispatch(request());

        portfolioService.updatePortfolioProducts(portfolioId, portfolioProducts)
            .then(()=>{
                dispatch(success());
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    }

    function request() { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_REQUEST } }
    function success() { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_SUCCESS } }
    function failure() { return { type: portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_FAILURE } }
}
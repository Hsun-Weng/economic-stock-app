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
                dispatch(notificationActions.enqueueNotification({
                    message: `新增成功：投資組合 ${portfolio.portfolioName}`,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                    },
                }))
            },
            error=>{
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.ADD_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.ADD_PORTFOLIO_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.ADD_PORTFOLIO_FAILURE, error } }
}

function deletePortfolio(portfolioId) {
    return dispatch => {
        dispatch(request());

        portfolioService.deletePortfolio(portfolioId)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
                dispatch(notificationActions.enqueueNotification({
                    message: `刪除成功`,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                    },
                }))
            },
            error=>{
                console.log(error);
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.DELETE_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.DELETE_PORTFOLIO_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.DELETE_PORTFOLIO_FAILURE, error } }
}

function updatePortfolio(portfolioId, portfolio) {
    return dispatch => {
        dispatch(request());

        portfolioService.updatePortfolio(portfolioId, portfolio)
            .then(()=>{
                dispatch(success());
                dispatch(getPortfolio());
                dispatch(notificationActions.enqueueNotification({
                    message: `修改成功`,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                    },
                }))
            },
            error=>{
                dispatch(failure(error));
            })
    }

    function request() { return { type: portfolioConstants.UPDATE_PORTFOLIO_REQUEST } }
    function success() { return { type: portfolioConstants.UPDATE_PORTFOLIO_SUCCESS } }
    function failure(error) { return { type: portfolioConstants.UPDATE_PORTFOLIO_FAILURE, error } }
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

function addPortfolioProduct(portfolioId, portfolioProduct) {
    return dispatch => {
        dispatch(request());

        portfolioService.addPortfolioProduct(portfolioId, portfolioProduct)
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
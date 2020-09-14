import stockConstants from '../constants/stock.constants';
import { stockService } from '../services';
import { notificationActions } from './';

export const stockAction = {
    getAllStocks,
    getCategories,
    getCategoryStocks,
    getStockPrices,
    getStockIndex,
    getLatestStockPrice,
    getAllStockIndexes,
    getLatestStockIndexPrice,
    getStockChip,
    getStockMargin
}

function getAllStocks() {
    return dispatch => {
        dispatch(request());

        stockService.getAllStocks()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_ALL_STOCKS_REQUEST } }
    function success(data) { return { type: stockConstants.GET_ALL_STOCKS_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_ALL_STOCKS_FAILURE } }
}

function getCategories() {
    return dispatch => {
        dispatch(request());

        stockService.getCategories()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_CATEGORIES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_CATEGORIES_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_CATEGORIES_FAILURE } }
}

function getCategoryStocks(categoryCode) {
    return dispatch => {
        dispatch(request());

        stockService.getCategoryStocks(categoryCode)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_CATEGORY_STOCKS_REQUEST } }
    function success(data) { return { type: stockConstants.GET_CATEGORY_STOCKS_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_CATEGORY_STOCKS_FAILURE } }
}

function getStockPrices(stockCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockPrices(stockCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_PRICES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_PRICES_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_PRICES_FAILURE } }
}

function getStockIndex(indexCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockIndex(indexCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_INDEX_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_INDEX_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_INDEX_FAILURE } }
}

function getLatestStockPrice(products) {
    return dispatch => {
        dispatch(request());

        stockService.getLatestStockPrice(products)
            .then(data=>{
                let result = data.map((detail)=>{
                    return {...detail,
                        productCode: detail.stockCode,
                        productName: products.find((stock)=>stock.productCode===detail.stockCode).productName,
                        sort: products.find((stock)=>stock.productCode===detail.stockCode).sort
                    };
                })
                dispatch(success(result));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_LATEST_STOCK_PRICES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_LATEST_STOCK_PRICES_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_LATEST_STOCK_PRICES_FAILURE } }
}

function getAllStockIndexes() {
    return dispatch => {
        dispatch(request());

        stockService.getAllStockIndexes()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_ALL_STOCK_INDEXES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_ALL_STOCK_INDEXES_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_ALL_STOCK_INDEXES_FAILURE } }
}

function getLatestStockIndexPrice(products) {
    return dispatch => {
        dispatch(request());

        stockService.getLatestStockIndexPrice(products)
            .then(data=>{
                let result = data.map((detail)=>{
                    return {...detail,
                        productCode: detail.indexCode,
                        productName: products.find((index)=>index.productCode===detail.indexCode).productName,
                        sort: products.find((index)=>index.productCode===detail.indexCode).sort
                    };
                })
                dispatch(success(result));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_LATEST_STOCK_INDEX_PRICES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_LATEST_STOCK_INDEX_PRICES_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_LATEST_STOCK_INDEX_PRICES_FAILURE } }
}

function getStockChip(stockCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockChip(stockCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_CHIP_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_CHIP_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_CHIP_FAILURE } }
}

function getStockMargin(stockCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockMargin(stockCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_MARGIN_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_MARGIN_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_MARGIN_FAILURE } }
}
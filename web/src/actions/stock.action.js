import stockConstants from '../constants/stock.constants';
import { stockService } from '../services';

export const stockAction = {
    getCategories,
    getCategoryStocks,
    getStockPrices,
    getStockIndex
}

function getCategories() {
    return dispatch => {
        dispatch(request());

        stockService.getCategories()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: stockConstants.GET_CATEGORIES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_CATEGORIES_SUCCESS, data } }
    function failure(error) { return { type: stockConstants.GET_CATEGORIES_FAILURE, error } }
}

function getCategoryStocks(categoryCode) {
    return dispatch => {
        dispatch(request());

        stockService.getCategoryStocks(categoryCode)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: stockConstants.GET_CATEGORY_STOCKS_REQUEST } }
    function success(data) { return { type: stockConstants.GET_CATEGORY_STOCKS_SUCCESS, data } }
    function failure(error) { return { type: stockConstants.GET_CATEGORY_STOCKS_FAILURE, error } }
}

function getStockPrices(stockCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockPrices(stockCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_PRICES_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_PRICES_SUCCESS, data } }
    function failure(error) { return { type: stockConstants.GET_STOCK_PRICES_FAILURE, error } }
}

function getStockIndex(indexCode, startDate, endDate) {
    return dispatch => {
        dispatch(request());

        stockService.getStockIndex(indexCode, startDate, endDate)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_INDEX_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_INDEX_SUCCESS, data } }
    function failure(error) { return { type: stockConstants.GET_STOCK_INDEX_FAILURE, error } }
}
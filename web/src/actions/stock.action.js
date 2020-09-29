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
    getStockMargin,
    getStockRank
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

    function request() { return { type: stockConstants.GET_STOCK_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_FAILURE } }
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

    function request() { return { type: stockConstants.GET_STOCK_INDEX_PRICE_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_INDEX_PRICE_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_INDEX_PRICE_FAILURE } }
}

function getLatestStockPrice(stocks) {
    return dispatch => {
        let stockCodes = stocks.map((stock)=>stock.stockCode);
        dispatch(request());

        stockService.getLatestStockPrice(stockCodes)
            .then(data=>{
                let stockPrices = data.map((detail)=>{
                    return {...detail,
                        stockName: stocks.find((stock)=>stock.stockCode===detail.stockCode).stockName
                    };
                })
                dispatch(success(stockPrices));
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

    function request() { return { type: stockConstants.GET_STOCK_INDEX_REQUEST } }
    function success(data) { return { type: stockConstants.GET_STOCK_INDEX_SUCCESS, data } }
    function failure() { return { type: stockConstants.GET_STOCK_INDEX_FAILURE } }
}

function getLatestStockIndexPrice(indexes) {
    return dispatch => {
        let indexCodes = indexes.map((index)=>index.indexCode);
        dispatch(request());

        stockService.getLatestStockIndexPrice(indexCodes)
            .then(data=>{
                let stockIndexPrices = data.map((detail)=>{
                    return {...detail,
                        indexName: indexes.find((stockIndex)=>stockIndex.indexCode===detail.indexCode).indexName
                    };
                })
                dispatch(success(stockIndexPrices));
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

function getStockRank(allStocks, sortColumn, page, size, direction) {
    return dispatch => {
        dispatch(request());

        stockService.getStockRank(sortColumn, page, size, direction)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: stockConstants.GET_STOCK_RANK_REQUEST } }
    function success(data) { 
        let page = {
            page: data.pageable.page,
            size: data.pageable.size,
            totalSize: data.total
        };
        let stocks = data.content.map((detail)=>{
            let stock = allStocks.find((stock)=>stock.stockCode===detail.stockCode);
            let stockName = stock?stock.stockName:"";
            return {...detail,
                stockName: stockName
            };
        });

        return { type: stockConstants.GET_STOCK_RANK_SUCCESS, data: stocks, page } 
    }
    function failure() { return { type: stockConstants.GET_STOCK_RANK_FAILURE } }
}
import stockConstants from '../constants/stock.constants';

export const stock_categories = (state={data: []}, action) => {
    switch(action.type) {
        case stockConstants.GET_CATEGORIES_REQUEST: 
            return { loading: true, data: [] };
        case stockConstants.GET_CATEGORIES_SUCCESS:
            return { data: action.data };
        case stockConstants.GET_CATEGORIES_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}

export const category_stocks = (state={data: []}, action) => {
    switch(action.type) {
        case stockConstants.GET_CATEGORY_STOCKS_REQUEST: 
            return { loading: true, data: [] };
        case stockConstants.GET_CATEGORY_STOCKS_SUCCESS:
            return { data: action.data };
        case stockConstants.GET_CATEGORY_STOCKS_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}

export const stock_prices = (state={data: []}, action) => {
    switch(action.type) {
        case stockConstants.GET_STOCK_PRICES_REQUEST: 
            return { loading: true, data: [] };
        case stockConstants.GET_STOCK_PRICES_SUCCESS:
            return { data: action.data };
        case stockConstants.GET_STOCK_PRICES_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}
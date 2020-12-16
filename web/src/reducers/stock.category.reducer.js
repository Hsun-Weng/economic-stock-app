import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: [],
    stockPrices: []
};

export const stockCategory = (state=initState, action) => {
    switch(action.type) {
        // categories
        case stockConstants.GET_CATEGORIES_REQUEST: 
            return {...state,
                loading: true,
                data: [],
            };
        case stockConstants.GET_CATEGORIES_SUCCESS:
            return {...state,
                loading: false,
                data: action.data,
                stockPrices: []
            };
        case stockConstants.GET_CATEGORIES_FAILURE:
            return {...state,
                loading: false,
                data: [],
                stockPrices: []
            };
        // category stocks
        case stockConstants.GET_CATEGORY_STOCK_PRICES_REQUEST: 
            return {...state,
                loading: true,
                stockPrices: []
            }
        case stockConstants.GET_CATEGORY_STOCK_PRICES_SUCCESS:
            return {...state,
                loading: false,
                stockPrices: action.data
            }
        case stockConstants.GET_CATEGORY_STOCK_PRICES_FAILURE:
            return { ...state,  
                loading: false,
                stockPrices: []
            };
        default: 
            return state;
    }
}

import stockConstants from '../constants/stock.constants';

const initState = {
    error: null,
    categories: {loading : false, data: []}, 
    price: {loading: false, data: []}, 
    categoryStocks: {loading: false, data:[] },
    index: {loading: false, data:[]},
    latestPrices: {loading:false, data: []},
    allStocks: {loading: false, data:[]}
};

export const stock = (state=initState, action) => {
    switch(action.type) {
        // all stocks
        case stockConstants.GET_ALL_STOCKS_REQUEST: 
            return {...state,
                allStocks: { loading: true, data: [] }
            }
        case stockConstants.GET_ALL_STOCKS_SUCCESS:
            return {...state,
                allStocks: { loading: false, data: action.data }
            }
        case stockConstants.GET_ALL_STOCKS_FAILURE:
            return { ...state,  
                error: action.error };
        // categories
        case stockConstants.GET_CATEGORIES_REQUEST: 
            return {...state,
                categories: { loading: true, data: [] }
            };
        case stockConstants.GET_CATEGORIES_SUCCESS:
            return {...state,
                categories: { loading: false, data: action.data }
            };
        case stockConstants.GET_CATEGORIES_FAILURE:
            return {...state,
                error: action.error 
            };
        // category stocks
        case stockConstants.GET_CATEGORY_STOCKS_REQUEST: 
            return {...state,
                categoryStocks: { loading: true, data: [] }
            }
        case stockConstants.GET_CATEGORY_STOCKS_SUCCESS:
            return {...state,
                categoryStocks: { loading: false, data: action.data }
            }
        case stockConstants.GET_CATEGORY_STOCKS_FAILURE:
            return { ...state,  
                error: action.error };
        // stock price
        case stockConstants.GET_STOCK_PRICES_REQUEST: 
            return { ...state,
                price: { loading: true, data: [] }
            }
        case stockConstants.GET_STOCK_PRICES_SUCCESS:
            return { ...state,
                price: { loading: false, data: action.data }
            }
        case stockConstants.GET_STOCK_PRICES_FAILURE:
            return { ...state,
                error: action.error 
            };
        // stock index
        case stockConstants.GET_STOCK_INDEX_REQUEST: 
            return { ...state,
                index: { loading: true, data: [] }
            }
        case stockConstants.GET_STOCK_INDEX_SUCCESS:
            return { ...state,
                index: { loading: false, data: action.data }
            }
        case stockConstants.GET_STOCK_INDEX_FAILURE:
            return { ...state,
                error: action.error 
            };
        // batch stock price
        case stockConstants.GET_LATEST_STOCK_PRICES_REQUEST: 
            return { ...state,
                latestPrices: { loading: true, data: [] }
            }
        case stockConstants.GET_LATEST_STOCK_PRICES_SUCCESS:
            return { ...state,
                latestPrices: { loading: false, data: action.data }
            }
        case stockConstants.GET_LATEST_STOCK_PRICES_FAILURE:
            return { ...state,
                latestPrices: action.error 
            };

        default: 
            return state;
    }
}

import stockConstants from '../constants/stock.constants';

const initState = {
    categories: {loading : false, data: []}, 
    price: {loading: false, data: []}, 
    categoryStocks: {loading: false, data:[] },
    index: {loading: false, data:[]},
    latestPrices: {loading:false, data: []},
    allStocks: {loading: false, data:[]},
    allStockIndexes: {loading: false, data: []},
    latestIndexPrices: {loading:false, data: []},
    chips: {loading:false, data: []},
    margins: {loading:false, data: []}
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
                allStocks: { loading: false, data: [] },
            };
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
                categories: { loading: false, data: [] },
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
                categoryStocks: { loading: false, data: [] },
            };
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
                price: { loading: false, data: [] },
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
                index: { loading: false, data: [] },
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
                latestPrices: { loading: false, data: [] },
            };
        // all stock indexes
        case stockConstants.GET_ALL_STOCK_INDEXES_REQUEST: 
            return {...state,
                allStockIndexes: { loading: true, data: [] }
            }
        case stockConstants.GET_ALL_STOCK_INDEXES_SUCCESS:
            return {...state,
                allStockIndexes: { loading: false, data: action.data }
            }
        case stockConstants.GET_ALL_STOCK_INDEXES_FAILURE:
            return { ...state,  
                allStockIndexes: { loading: false, data: [] },
            };
        // batch stock index price
        case stockConstants.GET_LATEST_STOCK_INDEX_PRICES_REQUEST: 
            return { ...state,
                latestIndexPrices: { loading: true, data: [] }
            }
        case stockConstants.GET_LATEST_STOCK_INDEX_PRICES_SUCCESS:
            return { ...state,
                latestIndexPrices: { loading: false, data: action.data }
            }
        case stockConstants.GET_LATEST_STOCK_INDEX_PRICES_FAILURE:
            return { ...state,
                latestIndexPrices: { loading: false, data: [] },
            };
        // chips
        case stockConstants.GET_STOCK_CHIP_REQUEST: 
            return {...state,
                chips: { loading: true, data: [] }
            };
        case stockConstants.GET_STOCK_CHIP_SUCCESS:
            return {...state,
                chips: { loading: false, data: action.data }
            };
        case stockConstants.GET_STOCK_CHIP_FAILURE:
            return { ...state,
                chips: { loading: false, data: [] },
            };
        // margins
        case stockConstants.GET_STOCK_MARGIN_REQUEST: 
            return {...state,
                margins: { loading: true, data: [] }
            };
        case stockConstants.GET_STOCK_MARGIN_SUCCESS:
            return {...state,
                margins: { loading: false, data: action.data }
            };
        case stockConstants.GET_STOCK_MARGIN_FAILURE:
            return { ...state,
                margins: { loading: false, data: [] },
            };
        default: 
            return state;
    }
}

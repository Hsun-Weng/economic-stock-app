import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: [],
    latest: []
};

export const stockPrice = (state=initState, action) => {
    switch(action.type) {
        // stock price
        case stockConstants.GET_STOCK_PRICES_REQUEST: 
            return { ...state,
                loading: true,
                data: []
            }
        case stockConstants.GET_STOCK_PRICES_SUCCESS:
            return { ...state,
                loading: false,
                data: action.data
            }
        case stockConstants.GET_STOCK_PRICES_FAILURE:
            return { ...state,
                loading: false,
                data: []
            };
        // batch stock price
        case stockConstants.GET_LATEST_STOCK_PRICES_REQUEST: 
            return { ...state,
                loading: true,
                latest: []
            }
        case stockConstants.GET_LATEST_STOCK_PRICES_SUCCESS:
            return { ...state,
                loading: false,
                latest: action.data
            }
        case stockConstants.GET_LATEST_STOCK_PRICES_FAILURE:
            return { ...state,
                loading: false,
                latest: []
            };
        default: 
            return state;
    }
}

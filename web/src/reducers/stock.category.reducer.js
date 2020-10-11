import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: [],
    stocks: []
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
                stocks: []
            };
        case stockConstants.GET_CATEGORIES_FAILURE:
            return {...state,
                loading: false,
                data: [],
                stocks: []
            };
        // category stocks
        case stockConstants.GET_CATEGORY_STOCKS_REQUEST: 
            return {...state,
                loading: true,
                stocks: []
            }
        case stockConstants.GET_CATEGORY_STOCKS_SUCCESS:
            return {...state,
                loading: false,
                stocks: action.data
            }
        case stockConstants.GET_CATEGORY_STOCKS_FAILURE:
            return { ...state,  
                loading: false,
                stocks: []
            };
        default: 
            return state;
    }
}

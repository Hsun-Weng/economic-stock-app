import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: [],
};

export const stockIndexPrice = (state=initState, action) => {
    switch(action.type) {
        case stockConstants.GET_STOCK_INDEX_PRICE_REQUEST:
            return {...state,
                loading: true,
                data: []
            };
        case stockConstants.GET_STOCK_INDEX_PRICE_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case stockConstants.GET_STOCK_INDEX_PRICE_FAILURE:
            return {...state,
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}

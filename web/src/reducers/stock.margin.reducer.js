import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: []
};

export const stockMargin = (state=initState, action) => {
    switch(action.type) {
        // margins
        case stockConstants.GET_STOCK_MARGIN_REQUEST: 
            return {...state,
                loading: true,
                data: [] 
            };
        case stockConstants.GET_STOCK_MARGIN_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case stockConstants.GET_STOCK_MARGIN_FAILURE:
            return { ...state,
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}

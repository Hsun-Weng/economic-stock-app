import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: []
};

export const stock = (state=initState, action) => {
    switch(action.type) {
        // all stocks
        case stockConstants.GET_STOCK_REQUEST: 
            return {...state,
                loading: true,
                data: []
            }
        case stockConstants.GET_STOCK_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            }
        case stockConstants.GET_STOCK_FAILURE:
            return { ...state,  
                loading: true,
                data: action.data
            };
        default: 
            return state;
    }
}

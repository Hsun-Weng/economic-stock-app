import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: []
};

export const stockIndex = (state=initState, action) => {
    switch(action.type) {
        // all stock indexes
        case stockConstants.GET_STOCK_INDEX_REQUEST: 
            return {...state,
                loading: true,
                data: []
            }
        case stockConstants.GET_STOCK_INDEX_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            }
        case stockConstants.GET_STOCK_INDEX_FAILURE:
            return { ...state,  
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}

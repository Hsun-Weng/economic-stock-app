import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: []
};

export const stockRank = (state=initState, action) => {
    switch(action.type) {
        // rank
        case stockConstants.GET_STOCK_RANK_REQUEST: 
            return {...state,
                loading: true,
                data: []
            };
        case stockConstants.GET_STOCK_RANK_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case stockConstants.GET_STOCK_RANK_FAILURE:
            return { ...state,
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}

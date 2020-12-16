import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: [],
    page: {
        totalPage: 0,
        page: 0,
        size: 10
    }
};

export const stockRank = (state=initState, action) => {
    switch(action.type) {
        // rank
        case stockConstants.GET_STOCK_RANK_REQUEST: 
            return {...state,
                loading: true,
                data: [],
                page: {
                    totalPage: 0,
                    page: 0,
                    size: 10
                }
            };
        case stockConstants.GET_STOCK_RANK_SUCCESS:
            return {...state,
                loading: false,
                data: action.data,
                page: action.page
            };
        case stockConstants.GET_STOCK_RANK_FAILURE:
            return { ...state,
                loading: false,
                data: [],
                page: {
                    totalPage: 0,
                    page: 0,
                    size: 10
                }
            };
        default: 
            return state;
    }
}

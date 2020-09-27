import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: []
};

export const stockChip = (state=initState, action) => {
    switch(action.type) {
        // chip
        case stockConstants.GET_STOCK_CHIP_REQUEST: 
            return {...state,
                loading: true,
                data: [] 
            };
        case stockConstants.GET_STOCK_CHIP_SUCCESS:
            return {...state,
                loading: false,
                data: action.data 
            };
        case stockConstants.GET_STOCK_CHIP_FAILURE:
            return { ...state,
                loading: false,
                 data: []
            };
        default: 
            return state;
    }
}

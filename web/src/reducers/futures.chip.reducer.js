import futuresConstants from '../constants/futures.constants';

const initState = {
    loading: false,
    data: []
};

export const futuresChip = (state=initState, action) => {
    switch(action.type) {
        // chip
        case futuresConstants.GET_FUTURES_CHIP_REQUEST: 
            return {...state,
                loading: true,
                data: []
            };
        case futuresConstants.GET_FUTURES_CHIP_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case futuresConstants.GET_FUTURES_CHIP_FAILURE:
            return { ...state,
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}
import futuresConstants from '../constants/futures.constants';

export const futures = (state={data: []}, action) => {
    switch(action.type) {
        case futuresConstants.GET_FUTURES_REQUEST: 
            return { loading: true, data: [] };
        case futuresConstants.GET_FUTURES_SUCCESS:
            return { data: action.data };
        case futuresConstants.GET_FUTURES_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}

export const futures_chip = (state={data: []}, action) => {
    switch(action.type) {
        case futuresConstants.GET_FUTURES_CHIP_REQUEST: 
            return { loading: true, data: [] };
        case futuresConstants.GET_FUTURES_CHIP_SUCCESS:
            return { data: action.data };
        case futuresConstants.GET_FUTURES_CHIP_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}
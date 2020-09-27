import futuresConstants from '../constants/futures.constants';

const initState = {
    loading: false,
    data: []
};

export const futures = (state=initState, action) => {
    switch(action.type) {
        // futures
        case futuresConstants.GET_FUTURES_REQUEST: 
            return {...state,
                loading: true,
                data: []
            };
        case futuresConstants.GET_FUTURES_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case futuresConstants.GET_FUTURES_FAILURE:
            return { ...state,
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}
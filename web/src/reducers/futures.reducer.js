import futuresConstants from '../constants/futures.constants';

const initState = {
    error: null,
    futures: {loading : false, data: []},
    chips: {loading: false, data: []} 
};

export const futures = (state=initState, action) => {
    switch(action.type) {
        // futures
        case futuresConstants.GET_FUTURES_REQUEST: 
            return {...state,
                futures: { loading: true, data: [] }
            };
        case futuresConstants.GET_FUTURES_SUCCESS:
            return {...state,
                futures: { loading: false, data: action.data }
            };
        case futuresConstants.GET_FUTURES_FAILURE:
            return { ...state,
                error: action.error 
            };
        // chips
        case futuresConstants.GET_FUTURES_CHIP_REQUEST: 
            return {...state,
                chips: { loading: true, data: [] }
            };
        case futuresConstants.GET_FUTURES_CHIP_SUCCESS:
            return {...state,
                chips: { loading: false, data: action.data }
            };
        case futuresConstants.GET_FUTURES_CHIP_FAILURE:
            return { ...state,
                error: action.error };
        
        default: 
            return state;
    }
}
import economicConstants from '../constants/economic.constants';

const initState = {
    loading: false,
    data: []
}

export const economicData = (state=initState, action) => {
    switch(action.type) {
        // economic data
        case economicConstants.GET_ECONOMIC_DATA_REQUEST: 
            return {...state, 
                loading: true,
                data: []
            };
        case economicConstants.GET_ECONOMIC_DATA_SUCCESS:
            return {...state, 
                loading: false,
                data: action.data
            };
        case economicConstants.GET_ECONOMIC_DATA_FAILURE:
            return {...state, 
                loading: false,
                data: []
            };
        default: 
            return state;
    }
}

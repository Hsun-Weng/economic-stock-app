import economicConstants from '../constants/economic.constants';

const initState = {
    loading: false,
    data: [],
    chartData: []
}

export const economicValue = (state=initState, action) => {
    switch(action.type) {
        // economic value
        case economicConstants.GET_ECONOMIC_VALUE_REQUEST: 
            return {...state, 
                loading: true,
                data: []
            };
        case economicConstants.GET_ECONOMIC_VALUE_SUCCESS:
            return {...state, 
                loading: false,
                data: action.data
            };
        case economicConstants.GET_ECONOMIC_VALUE_FAILURE:
            return {...state, 
                loading: false,
                data: []
            };
        // chart data
        case economicConstants.GET_ECONOMIC_CHART_DATA_REQUEST: 
            return {...state, 
                chartData: []
            };
        case economicConstants.GET_ECONOMIC_CHART_DATA_SUCCESS:
            return {...state, 
                chartData: action.data
            };
        case economicConstants.GET_ECONOMIC_CHART_DATA_FAILURE:
            return {...state, 
                chartData: []
            };
        default: 
            return state;
    }
}

import economicConstants from '../constants/economic.constants';

const initState = {
    data: { loading: false, data: [] },
    value: { loading: false, data: [] },
    chartData: { loading: false, data: [] }
}

export const economic = (state=initState, action) => {
    switch(action.type) {
        // economic data
        case economicConstants.GET_ECONOMIC_DATA_REQUEST: 
            return {...state, 
                data: { loading: true, data: [] }
            };
        case economicConstants.GET_ECONOMIC_DATA_SUCCESS:
            return {...state, 
                data: { loading: false, data: action.data }
            };
        case economicConstants.GET_ECONOMIC_DATA_FAILURE:
            return {...state, 
                data: { loading: false, data: [] },
            };
        // economic value
        case economicConstants.GET_ECONOMIC_VALUE_REQUEST: 
            return {...state, 
                value: { loading: true, data: [] }
            };
        case economicConstants.GET_ECONOMIC_VALUE_SUCCESS:
            return {...state, 
                value: { loading: false, data: action.data }
            };
        case economicConstants.GET_ECONOMIC_VALUE_FAILURE:
            return {...state, 
                value: { loading: false, data: [] },
            };
        // chart data
        case economicConstants.GET_ECONOMIC_CHART_DATA_REQUEST: 
            return {...state, 
                chartData: { loading: true, data: [] }
            };
        case economicConstants.GET_ECONOMIC_CHART_DATA_SUCCESS:
            return {...state, 
                chartData: { loading: false, data: action.data }
            };
        case economicConstants.GET_ECONOMIC_CHART_DATA_FAILURE:
            return {...state, 
                chartData: { loading: false, data: [] },
            };
        default: 
            return state;
    }
}

import economicConstants from '../constants/economic.constants';
import { economicService } from '../services';

export const economicAction = {
    getEconomicData,
    getEconomicValue,
    getEconomicChartData
}

function getEconomicData(countryCode) {
    return dispatch => {
        dispatch(request());

        economicService.getEconomicData(countryCode)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: economicConstants.GET_ECONOMIC_DATA_REQUEST } }
    function success(data) { return { type: economicConstants.GET_ECONOMIC_DATA_SUCCESS, data } }
    function failure(error) { return { type: economicConstants.GET_ECONOMIC_DATA_FAILURE, error } }
}

function getEconomicValue(countryCode, dataId) {
    return dispatch => {
        dispatch(request());

        economicService.getEconomicValue(countryCode, dataId)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: economicConstants.GET_ECONOMIC_VALUE_REQUEST } }
    function success(data) { return { type: economicConstants.GET_ECONOMIC_VALUE_SUCCESS, data } }
    function failure(error) { return { type: economicConstants.GET_ECONOMIC_VALUE_FAILURE, error } }
}

function getEconomicChartData(unitCode, data) {
    return dispatch => {
        dispatch(request());

        economicService.getEconomicChartData(unitCode, data)
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: economicConstants.GET_ECONOMIC_CHART_DATA_REQUEST } }
    function success(data) { return { type: economicConstants.GET_ECONOMIC_CHART_DATA_SUCCESS, data } }
    function failure(error) { return { type: economicConstants.GET_ECONOMIC_CHART_DATA_FAILURE, error } }
}
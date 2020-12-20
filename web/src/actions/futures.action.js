import fururesConstants from '../constants/futures.constants';
import { futuresService } from '../services';
import { notificationActions } from './';

export const futuresAction = {
    getFutures
}

function getFutures() {
    return dispatch => {
        dispatch(request());

        futuresService.getFutures()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
                dispatch(notificationActions.enqueueError(error));
            })
    };

    function request() { return { type: fururesConstants.GET_FUTURES_REQUEST } }
    function success(data) { return { type: fururesConstants.GET_FUTURES_SUCCESS, data } }
    function failure() { return { type: fururesConstants.GET_FUTURES_FAILURE } }
}
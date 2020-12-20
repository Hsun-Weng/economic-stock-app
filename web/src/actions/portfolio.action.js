import portfolioConstants from '../constants/portfolio.constants';
import { portfolioService } from '../services';
import { stockService } from '../services';

import { notificationActions } from './';

import arrayMove from 'array-move';

export const portfolioAction = {
    getPortfolios,
}

function getPortfolios() {
    return dispatch => {
        dispatch(request());

        portfolioService.getPortfolios()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure());
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_SUCCESS, data } }
    function failure() { return { type: portfolioConstants.GET_PORTFOLIO_FAILURE } }
}
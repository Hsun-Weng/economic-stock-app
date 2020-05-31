import portfolioConstants from '../constants/portfolio.constants';
import { portfolioService } from '../services';

export const portfolioAction = {
    getPortfolio
}

function getPortfolio() {
    return dispatch => {
        dispatch(request());

        portfolioService.getCategories()
            .then(data=>{
                dispatch(success(data));
            },
            error=>{
                dispatch(failure(error));
            })
    };

    function request() { return { type: portfolioConstants.GET_PORTFOLIO_REQUEST } }
    function success(data) { return { type: portfolioConstants.GET_PORTFOLIO_SUCCESS, data } }
    function failure(error) { return { type: portfolioConstants.GET_PORTFOLIO_FAILURE, error } }
}
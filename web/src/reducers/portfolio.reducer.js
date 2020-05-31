import portfolioConstants from '../constants/portfolio.constants';

export const portfolio = (state={data: []}, action) => {
    switch(action.type) {
        case portfolioConstants.GET_PORTFOLIO_REQUEST: 
            return { loading: true, data: [] };
        case portfolioConstants.GET_PORTFOLIO_SUCCESS:
            return { data: action.data };
        case portfolioConstants.GET_PORTFOLIO_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}

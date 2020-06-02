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

export const add_portfolio = (state={data: []}, action) => {
    switch(action.type) {
        case portfolioConstants.ADD_PORTFOLIO_REQUEST: 
            return { loading: true };
        case portfolioConstants.ADD_PORTFOLIO_SUCCESS:
            return {};
        case portfolioConstants.ADD_PORTFOLIO_FAILURE:
            return { error: action.error };
        default: 
            return state;
    }
}
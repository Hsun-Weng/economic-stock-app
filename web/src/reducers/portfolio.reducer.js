import portfolioConstants from '../constants/portfolio.constants';

const initState = {
    loading: false,
    data: []
}

export const portfolio = (state=initState, action) => {
    switch(action.type) {
        case portfolioConstants.GET_PORTFOLIO_SUCCESS:
            return {
                loading: true,
                data: action.data
            }
        case portfolioConstants.GET_PORTFOLIO_SUCCESS:
            return {
                loading: false,
                data: action.data
            };
        case portfolioConstants.GET_PORTFOLIO_FAILURE:
            return {
                loading: false,
                data: []
            };
        default:
            return state;
    }
}


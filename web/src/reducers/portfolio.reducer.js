import portfolioConstants from '../constants/portfolio.constants';

const initState = {
    loading: false,
    adding: false,
    updating: false,
    deleting: false,
    data: []
}

export const portfolio = (state=initState, action) => {
    switch(action.type) {
        // portoflios
        case portfolioConstants.GET_PORTFOLIO_REQUEST: 
            return {...state,
                loading: true,
                data: []
            };
        case portfolioConstants.GET_PORTFOLIO_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case portfolioConstants.GET_PORTFOLIO_FAILURE:
            return {...state,
                loading: false,
                data: []
            };
        // Add portfolio
        case portfolioConstants.ADD_PORTFOLIO_REQUEST: 
            return {...state,
                adding: true
            };
        case portfolioConstants.ADD_PORTFOLIO_SUCCESS:
            return {...state,
                adding: false
            };
        case portfolioConstants.ADD_PORTFOLIO_FAILURE:
            return {...state,
                adding: false
            };
        // Delete portfolio
        case portfolioConstants.DELETE_PORTFOLIO_REQUEST: 
            return {...state,
                deleting: true
            };
        case portfolioConstants.DELETE_PORTFOLIO_SUCCESS:
            return {...state,
                deleting: false
            };
        case portfolioConstants.DELETE_PORTFOLIO_FAILURE:
            return {...state,
                deleting: false
            };
        // Update portfolio
        case portfolioConstants.UPDATE_PORTFOLIO_REQUEST: 
            return {...state,
                updating: true
            };
        case portfolioConstants.UPDATE_PORTFOLIO_SUCCESS:
            return {...state,
                updating: false
            };
        case portfolioConstants.UPDATE_PORTFOLIO_FAILURE:
            return {...state,
                updating: false
            };
        default:
            return state;
    }
}


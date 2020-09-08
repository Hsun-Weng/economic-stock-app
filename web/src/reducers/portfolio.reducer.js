import portfolioConstants from '../constants/portfolio.constants';

const initState = {
    error: null,
    portfolios: {loading: false, data: []},
    products: {loading: false, data: []},
    addPortfolio: {loading: false},
    addPortfolioProduct: {loading: false},
    updatePortfolio: {loading: false},
    updatePortfolioProduct: {loading: false},
    deletePortfolio: {loading: false}
}

export const portfolio = (state=initState, action) => {
    switch(action.type) {
        // portoflios
        case portfolioConstants.GET_PORTFOLIO_REQUEST: 
            return {...state,
                portfolios: {loading: true, data: []}
            };
        case portfolioConstants.GET_PORTFOLIO_SUCCESS:
            return {...state,
                portfolios: {loading: false, data: action.data}
            };
        case portfolioConstants.GET_PORTFOLIO_FAILURE:
            return {...state,
                error: action.error
            };
        // products
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_REQUEST:
            return {...state,
                products: {loading: true, data: []}
            }
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_SUCCESS:
            return {...state,
                products: {loading: false, data: action.data}
            };
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_FAILURE:
            return {...state,
                error: action.error
            };
        // Add portfolio
        case portfolioConstants.ADD_PORTFOLIO_REQUEST: 
            return {...state,
                addPortfolio:{ loading: true }
            };
        case portfolioConstants.ADD_PORTFOLIO_SUCCESS:
            return {...state,
                addPortfolio:{ loading: false }
            };
        case portfolioConstants.ADD_PORTFOLIO_FAILURE:
            return {...state,
                error: action.error
            };
        // Delete portfolio
        case portfolioConstants.DELETE_PORTFOLIO_REQUEST: 
            return {...state,
                deletePortfolio:{ loading: true }
            };
        case portfolioConstants.DELETE_PORTFOLIO_SUCCESS:
            return {...state,
                deletePortfolio:{ loading: false }
            };
        case portfolioConstants.DELETE_PORTFOLIO_FAILURE:
            return {...state,
                error: action.error
            };
        // Update portfolio
        case portfolioConstants.UPDATE_PORTFOLIO_REQUEST: 
            return {...state,
                updatePortfolio:{ loading: true }
            };
        case portfolioConstants.UPDATE_PORTFOLIO_SUCCESS:
            return {...state,
                updatePortfolio:{ loading: false }
            };
        case portfolioConstants.UPDATE_PORTFOLIO_FAILURE:
            return {...state,
                error: action.error
            };
        // Add portfolio product
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_REQUEST: 
            return {...state,
                addPortfolioProduct:{ loading: true }
            };
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_SUCCESS:
            return {...state,
                addPortfolioProduct:{ loading: false }
            };
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_FAILURE:
            return {...state,
                error: action.error
            };
        // Update portfolio product
        case portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_REQUEST: 
            return {...state,
                updatePortfolioProduct:{ loading: true }
            };
        case portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_SUCCESS:
            return {...state,
                updatePortfolioProduct:{ loading: false }
            };
        case portfolioConstants.UPDATE_PORTFOLIO_PRODUCTS_FAILURE:
            return {...state,
                error: action.error
            };
        default:
            return state;
    }
}
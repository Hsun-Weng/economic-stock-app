import portfolioConstants from '../constants/portfolio.constants';

const initState = {
    portfolios: {loading: false, data: []},
    products: {loading: false, data: []},
    addPortfolio: {loading: false},
    addPortfolioProduct: {loading: false},
    updatePortfolio: {loading: false},
    updatePortfolioProduct: {loading: false},
    deletePortfolio: {loading: false},
    productPrices: {loading: false, data:[]}
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
                portfolios: {loading: false, data: []},
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
                products: {loading: false, data: []},
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
                addPortfolio:{ loading: false },
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
                deletePortfolio:{ loading: false },
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
                updatePortfolio:{ loading: false },
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
                addPortfolioProduct:{ loading: false },
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
                updatePortfolioProduct:{ loading: false },
            };
        // product prices
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_REQUEST:
            return {...state,
                productPrices: {loading: true, data: []}
            }
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_SUCCESS:
            return {...state,
                productPrices: {loading: false, data: action.data}
            };
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_FAILURE:
            return {...state,
                productPrices: {loading: false, data: []},
            };
        // resort prices
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_REQUEST:
            return {...state}
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_SUCCESS:
            return {...state,
                productPrices: {data: action.data}
            };
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_FAILURE:
            return {...state };
        default:
            return state;
    }
}


import portfolioConstants from '../constants/portfolio.constants';

const initState = {
    loading: false,
    adding: false,
    updating: false,
    deleting: false,
    data: [],
    price: []
}

export const portfolioProduct = (state=initState, action) => {
    switch(action.type) {
        // products
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_REQUEST:
            return {...state,
                loading: true,
                data: []
            }
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_SUCCESS:
            return {...state,
                loading: false,
                data: action.data
            };
        case portfolioConstants.GET_PORTFOLIO_PRODUCTS_FAILURE:
            return {...state,
                loading: false,
                data: []
            };
        // Add portfolio product
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_REQUEST: 
            return {...state,
                adding: true
            };
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_SUCCESS:
            return {...state,
                adding: false
            };
        case portfolioConstants.ADD_PORTFOLIO_PRODUCT_FAILURE:
            return {...state,
                adding: false
            };
        // product prices
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_REQUEST:
            return {...state,
                loading: true,
                price: []
            }
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_SUCCESS:
            return {...state,
                loading: false,
                price: action.data
            };
        case portfolioConstants.GET_PORTFOLIO_PRODUCT_PRICES_FAILURE:
            return {...state,
                loading: false,
                price: []
            };
        // resort prices
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_REQUEST:
            return {...state,
                updating: true
            }
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_SUCCESS:
            return {...state,
                updating: false,
                price: {data: action.data}
            };
        case portfolioConstants.RESORT_PORTFOLIO_PRODUCTS_FAILURE:
            return {...state ,
                updating: false
            };
        // delete product
        case portfolioConstants.DELETE_PORTFOLIO_PRODUCT_REQUEST:
            return {...state,
                deleting: true
            }
        case portfolioConstants.DELETE_PORTFOLIO_PRODUCT_SUCCESS:
            return {...state,
                deleting: false,
            };
        case portfolioConstants.DELETE_PORTFOLIO_PRODUCT_FAILURE:
            return {...state ,
                deleting: false
            };
        default:
            return state;
    }
}


import stockConstants from '../constants/stock.constants';

const initState = {
    loading: false,
    data: {},
};

export const stockCategoryProportion = (state=initState, action) => {
    switch(action.type) {
        // categories proportion
        case stockConstants.GET_CATEGORIES_PROPORTION_REQUEST: 
            return {...state,
                loading: true,
                data: {},
            };
        case stockConstants.GET_CATEGORIES_PROPORTION_SUCCESS:
            return {...state,
                loading: false,
                data:{
                    name: "加權指數",
                    children: action.data
                }
            };
        case stockConstants.GET_CATEGORIES_PROPORTION_FAILURE:
            return {...state,
                loading: false,
                data: {},
            };
        default: 
            return state;
    }
}

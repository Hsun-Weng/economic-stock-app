import { combineReducers } from 'redux';
import { user, login, signUp } from './user.reducer';
import { notification } from './notification.reducer';
import { stock_categories, category_stocks, stock_prices } from './stock.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    stock_categories,
    category_stocks,
    stock_prices,
    notification
});

export default rootReducer;
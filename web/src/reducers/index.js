import { combineReducers } from 'redux';
import { user, login, signUp } from './user.reducer';
import { notification } from './notification.reducer';
import { stock_categories, category_stocks, stock_prices, stock_index } from './stock.reducer';
import { futures, futures_chip } from './futures.reducer';
import { portfolio } from './portfolio.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    stock_categories,
    category_stocks,
    stock_prices,
    futures,
    stock_index,
    futures_chip,
    portfolio,
    notification
});

export default rootReducer;
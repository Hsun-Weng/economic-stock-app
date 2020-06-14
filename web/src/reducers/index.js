import { combineReducers } from 'redux';
import { user, login, signUp } from './user.reducer';
import { notification } from './notification.reducer';
import { stock } from './stock.reducer';
import { futures } from './futures.reducer';
import { portfolio } from './portfolio.reducer';
import { economic } from './economic.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    stock,
    futures,
    portfolio,
    economic,
    notification
});

export default rootReducer;
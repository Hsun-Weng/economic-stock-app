import { combineReducers } from 'redux';
import { user, login, signUp, oauthLogin } from './user.reducer';
import { notification } from './notification.reducer';
import { portfolio } from './portfolio.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    oauthLogin,
    portfolio,
    notification,
});

export default rootReducer;
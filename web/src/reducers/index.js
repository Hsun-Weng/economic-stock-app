import { combineReducers } from 'redux';
import { user, login, signUp } from './user.reducer';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    notification
});

export default rootReducer;
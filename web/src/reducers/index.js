import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { user } from './user.reducer';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
    auth,
    user,
    notification
});

export default rootReducer;
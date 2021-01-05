import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { notification } from './notification.reducer';
import { theme } from './theme.reducer';

const rootReducer = combineReducers({
    user,
    notification,
    theme
});

export default rootReducer;
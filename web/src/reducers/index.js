import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { notification } from './notification.reducer';
import { portfolio } from './portfolio.reducer';

const rootReducer = combineReducers({
    user,
    portfolio,
    notification,
});

export default rootReducer;
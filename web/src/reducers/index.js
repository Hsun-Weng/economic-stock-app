import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { notification } from './notification.reducer';
import { portfolio } from './portfolio.reducer';
import { theme } from './theme.reducer';

const rootReducer = combineReducers({
    user,
    portfolio,
    notification,
    theme
});

export default rootReducer;
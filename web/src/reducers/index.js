import { combineReducers } from 'redux';
import { user, login, signUp, oauthLogin } from './user.reducer';
import { notification } from './notification.reducer';
import { stock } from './stock.reducer';
import { futures } from './futures.reducer';
import { portfolio } from './portfolio.reducer';
import { portfolioProduct } from './portfolio.product.reducer';
import { stockChip } from './stock.chip.reducer';
import { stockMargin } from './stock.margin.reducer';
import { stockPrice } from './stock.price.reducer';
import { stockRank } from './stock.rank.reducer';
import { stockIndex } from './stock.index.reducer';
import { stockIndexPrice } from './stock.index.price.reducer';
import { futuresChip } from './futures.chip.reducer';

const rootReducer = combineReducers({
    user,
    login,
    signUp,
    oauthLogin,
    stock,
    stockChip,
    stockMargin,
    stockPrice,
    stockRank,
    stockIndex,
    stockIndexPrice,
    futures,
    futuresChip,
    portfolio,
    portfolioProduct,
    notification,
});

export default rootReducer;
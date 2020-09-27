import { combineReducers } from 'redux';
import { user, login, signUp, oauthLogin } from './user.reducer';
import { notification } from './notification.reducer';
import { stock } from './stock.reducer';
import { futures } from './futures.reducer';
import { portfolio } from './portfolio.reducer';
import { portfolioProduct } from './portfolio.product.reducer';
import { economicData } from './economic.data.reducer';
import { economicValue } from './economic.value.reducer'; 
import { stockCategory } from './stock.category.reducer';
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
    stockCategory,
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
    economicData,
    economicValue,
    notification
});

export default rootReducer;
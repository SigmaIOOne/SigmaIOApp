import { combineReducers } from 'redux';
import walletInfo from './walletInfo';
import contractAddr from './contractAddr';
import wallet from './wallet';
import nav from './nav';

// lxy 新增
import login from './login';

const reducers = combineReducers({
	walletInfo,
	contractAddr,
	wallet,
	nav,
    login,
});

export default reducers;

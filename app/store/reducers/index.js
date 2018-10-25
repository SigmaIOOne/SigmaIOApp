import { combineReducers } from 'redux';
import walletInfo from './walletInfo';
import contractAddr from './contractAddr';
import wallet from './wallet';
import nav from './nav';

// lxy 新增
import login from './login';
import netInfo from './netInfo';

const reducers = combineReducers({
	walletInfo,
	contractAddr,
	wallet,
	nav,
    // lxy 新增
    login,
    netInfo,
});

export default reducers;

/**
 * Created by Administrator on 2018/4/24.
 */
import update from 'immutability-helper';

const UPDATE_WALLET_ADDRESS = 'dbc/wallet/UPDATE_WALLET_ADDRESS';
const UPDATE_WALLET_NAME = 'dbc/wallet/UPDATE_WALLET_NAME';
const UPDATE_WALLET_USERID = 'dbc/wallet/UPDATE_WALLET_USERID';
// const UPDATE_WALLET_ADDRESS = 'wallet/UPDATE_WALLET_ADDRESS'
// 来自lxy新增
const CHANGE_LOGIN_STATE = 'dbc/wallet/CHANGE_LOGIN_STATE';
const UPDATE_WALLET_INFO = 'dbc/wallet/UPDATE_WALLET_INFO';

// ---------reducer---------
const initialState = {
  address: '',
  walletName: '',
  userId: '',
  // 来自lxy新增
  login: false,
  walletInfo: {}
};

export default function wallet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_WALLET_ADDRESS: {
      return update(state, {
        address: { $set: action.payload.address },
      });
    }
    case UPDATE_WALLET_NAME: {
      return update(state, {
        walletName: { $set: action.payload.walletName },
      });
    }
    case UPDATE_WALLET_USERID: {
      return update(state, {
        userId: { $set: action.payload.userId },
      });
    }
    case CHANGE_LOGIN_STATE: {
      return update(state, {
          login: { $set: action.payload.newState },
      });
    }
      case UPDATE_WALLET_INFO: {
          return update(state, {
              walletInfo: { $set: action.payload.info },
          });
      }
    default: return state;
  }
}

// ---------action---------

export function updateWalletAddress(address) {
  return {
    type: UPDATE_WALLET_ADDRESS,
    payload: {
        address
    }
  };
}

export function updateWalletName(walletName) {
  return {
    type: UPDATE_WALLET_NAME,
    payload: {
      walletName
    }
  };
}

export function updateUserId(userId){
  return {
    type: UPDATE_WALLET_USERID,
    payload: {
      userId
    }
  };
}

// 来自lxy新增
// 改变登录状态
export function changeLoginState(newState){
    return {
        type: CHANGE_LOGIN_STATE,
        payload: {
            newState
        }
    };
}

// 更新钱包信息
export function updateWalletInfo(info){
    return {
        type: UPDATE_WALLET_INFO,
        payload: {
            info
        }
    };
}



/**
 * 存放网络状态
 * lxy新增
 */
import update from 'immutability-helper';

const CHANGE_NET_CONNECT_STATE = 'dbc/netInfo/CHANGE_NET_CONNECT_STATE';

// ---------reducer---------
const initialState = {
    isConnected: false,
};

export default function netInfo(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_NET_CONNECT_STATE: {
            return update(state, {
                isConnected: { $set: action.payload.newState },
            });
        }
        default: return state;
    }
}

// 改变网络连接状态
export function changeNetConnectState(newState){
    return {
        type: CHANGE_NET_CONNECT_STATE,
        payload: {
            newState
        }
    };
}


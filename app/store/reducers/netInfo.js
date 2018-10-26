/**
 * 存放网络状态
 * lxy新增
 */
import update from 'immutability-helper';
import { I18n } from '../../../language/i18n';

const CHANGE_NET_CONNECT_STATE = 'dbc/netInfo/CHANGE_NET_CONNECT_STATE';

// ---------reducer---------
const initialState = {
    isConnected: true,
    noNetworkClickNum: 0, // 没网情况下的点击数量，用来进行刷新页面，显示toast弹窗提示
    errMsg: '',
};

export default function netInfo(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_NET_CONNECT_STATE: {
            let noNetworkClickNum = state.noNetworkClickNum;
            const newState = action.payload.newState;
            noNetworkClickNum = newState ? 0 : ++noNetworkClickNum;  // 恢复网络置成0
            errMsg = newState ? '' : I18n.t('error.noNetwork');
            return update(state, {
                isConnected: { $set: newState },
                noNetworkClickNum: { $set: noNetworkClickNum },
                errMsg: { $set: errMsg },
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


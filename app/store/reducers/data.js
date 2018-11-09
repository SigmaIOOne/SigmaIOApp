/**
 * 各种需要缓存的数据，我就不安模块分了，因为每个模块可能就一个要缓存的地方，或者没有
 * lxy新增
 */
import update from 'immutability-helper';

const CHANGE_SECURITY_STATE = 'dbc/data/CHANGE_SECURITY_STATE';
const RESET_DATA_REDUX = 'dbc/data/RESET_DATA_REDUX';
const SET_ALL_ORDER = 'dbc/data/SET_ALL_ORDER';
const SET_MESSAGE_LIST = 'dbc/data/SET_MESSAGE_LIST';
const SET_TRANSACTION_RECORD = 'dbc/data/SET_TRANSACTION_RECORD';

// ---------reducer---------
const initialState = {
    hasTransactionRecord: false, // 是否有交易记录缓存，因为没网时，就看空数组，无法判断
    transactionRecord: [], // 存放交易记录信息
    hasAllOrderCache: false, // 是否有全部订单的缓存，同理上面
    allOrder: [], // 全部订单信息
    hasMessageCache: false, // 是否有全部消息的缓存，同理上面
    messageList: [], // 全部消息信息
    securityCenterData: {
        bindPhone: true, // 绑定手机状态，用来后退刷新用，不然安全中心页面不会刷新
        hasCertificated: false, // 认证身份状态，同上
        bindCar: false, // 绑定车辆，同上
        hasSigned: false, // 签到情况，同上
    }
};

export default function data(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TRANSACTION_RECORD: {
            const data = action.payload.data ? action.payload.data : [];
            return update(state, {
                hasTransactionRecord: { $set: action.payload.hasCache },
                transactionRecord: { $set: data },
            });
        }
        case SET_ALL_ORDER: {
            const data = action.payload.data ? action.payload.data : [];
            return update(state, {
                hasAllOrderCache: { $set: action.payload.hasCache },
                allOrder: { $set: data },
            });
        }
        case SET_MESSAGE_LIST: {
            const data = action.payload.data ? action.payload.data : [];
            return update(state, {
                hasMessageCache: { $set: action.payload.hasCache },
                messageList: { $set: data },
            });
        }
        case CHANGE_SECURITY_STATE: {
            const data = JSON.parse(JSON.stringify(state.securityCenterData));
            data[action.payload.target] = action.payload.state;
            return update(state, {
                securityCenterData: { $set: data },
            });
        }
        case RESET_DATA_REDUX: {
            return update(state, {
                hasTransactionRecord: { $set: false },
                transactionRecord: { $set: [] },
                hasAllOrderCache: { $set: false },
                allOrder: { $set: [] },
                hasMessageCache: { $set: false },
                messageList: { $set: [] },
                securityCenterData: {
                    $set: {
                        bindPhone: true,
                        hasCertificated: false,
                        bindCar: false,
                        hasSigned: false,
                    }
                },
            });
        }
        default: return state;
    }
}

// 设置交易记录信息
export function setTransactionRecord(data, hasCache = true){
    return {
        type: SET_TRANSACTION_RECORD,
        payload: {
            data,
            hasCache,
        }
    };
}

// 设置全部订单信息
export function setAllOrder(data, hasCache = true){
    return {
        type: SET_ALL_ORDER,
        payload: {
            data,
            hasCache,
        }
    };
}

// 设置全部消息信息
export function setMessageList(data, hasCache = true){
    return {
        type: SET_MESSAGE_LIST,
        payload: {
            data,
            hasCache,
        }
    };
}

// 改变安全中心对应状态
export function changeSecurityState(target, state){
    return {
        type: CHANGE_SECURITY_STATE,
        payload: {
            target,
            state,
        }
    };
}

// 重置data里的所有缓存，退出登录用
export function resetDataRedux() {
    return {
        type: RESET_DATA_REDUX,
    }
}

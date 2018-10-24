/**
 * 手机号/邮箱的登录
 * lxy新增
 */
import update from 'immutability-helper';

const CHANGE_LOGIN_STATE = 'dbc/login/CHANGE_LOGIN_STATE';

// ---------reducer---------
const initialState = {
    login: true, // 是否手机登录了
    userInfo: {}, // 存放用户信息
};

export default function login(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_LOGIN_STATE: {
            return update(state, {
                login: { $set: action.payload.newState },
            });
        }
        default: return state;
    }
}

// 更改登录状态
export function changeLoginState(newState){
    return {
        type: CHANGE_LOGIN_STATE,
        payload: {
            newState
        }
    };
}
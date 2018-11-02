import axios from './helper';

// 获取手机号验证码
const getPhoneCode = async (phone, type, verify) => {
    const body = {
        phone,
        type
    };
    // 注册的时候才有图形验证码
    if (type === 'register') body.verify = verify;
    return axios.post('/Home/Api/distribute?apiid=register_message', body);
}

// 验证用户短信验证码 --- 立即注册按钮有用到 ， 密码找回第一页里有用
const checkPhoneCode = async (phone, message) => {
    const body = {
        phone,
        message
    };
    return axios.post('/Home/Api/distribute?apiid=verifying_sms', body);
}

// 注册用户设置密码接口
const registrySetPsd = async (password) => {
    const body = {
        password
    };
    return axios.post('/Home/Api/distribute?apiid=register', body);
}

// 用户重置密码接口
const userResetPsd = async (password) => {
    const body = {
        password
    };
    return axios.post('/Home/Api/distribute?apiid=remanufacture', body);
}

// 用户密码登录
const login = async (phone, password) => {
    const body = {
        phone,
        password
    };
    return axios.post('/Home/Api/distribute?apiid=UserLogin', body);
}

// 退出登录
const logout = async () => {
    return axios.post('/Home/Api/distribute?apiid=UserSignOut');
}

export {
    checkPhoneCode,
    getPhoneCode,
    login,
    logout,
    registrySetPsd,
    userResetPsd,
}
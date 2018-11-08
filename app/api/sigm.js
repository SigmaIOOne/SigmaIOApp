import axios from './helper';

// 获取sigm的tab页上的数据信息
const getSigmTab = async () => {
    return axios.post('/Home/Api/distribute?apiid=Index');
}

// 获取SIGM -> 总资产 -> 账户详情页上的数据信息
const getAccountDetail = async () => {
    return axios.post('/Home/Api/distribute?apiid=allwallet');
}

// 获取SIGM -> 总资产 -> 账户详情页上的划转接口
const transferAmount = async (miningaccount) => {
    const body = {
        miningaccount
    };
    return axios.post('/Home/Api/distribute?apiid=transfer', body);
}

// 获取SIGM -> 挖矿页面上的数据信息
const getMiningData = async () => {
    return axios.post('/Home/Api/distribute?apiid=Mining');
}

// SIGM -> 挖矿账户 -> 获取算力
const getDeposit = async () => {
    return axios.post('/Home/Api/distribute?apiid=security');
}

// SIGM -> 挖矿账户 -> 获取算力 -> 绑定车辆信息
const bindCar = async (body) => {
    return axios.post('/Home/Api/distribute?apiid=vehicle_information', body);
}

// SIGM -> 挖矿账户 -> 获取算力 -> 邀请好友页面信息
const getInviteFriendsData = async () => {
    return axios.post('/Home/Api/distribute?apiid=user_in');
}

// 获取交易记录
const getTransactionRecord = async () => {
    return axios.post('/Home/Api/distribute?apiid=allorder');
}

// 用户签到
const userSignIn = async () => {
    return axios.post('/Home/Api/distribute?apiid=usersign');
}

export {
    bindCar,
    getAccountDetail,
    getDeposit,
    getInviteFriendsData,
    getMiningData,
    getSigmTab,
    getTransactionRecord,
    transferAmount,
    userSignIn,
}

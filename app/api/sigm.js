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

export {
    getAccountDetail,
    getSigmTab,
    transferAmount,
}

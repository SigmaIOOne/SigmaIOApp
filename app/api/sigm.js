import axios from './helper';

// 获取sigm的tab页上的数据信息
const getSigmTab = async () => {
    return axios.post('/Home/Api/distribute?apiid=Index');
}

export {
    getSigmTab,
}

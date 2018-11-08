import axios from './helper';

// 提交意见反馈
// 这个title就是那个手机号
const sendSuggest = async (title, text) => {
    const body = {
        title,
        text,
    };
    return axios.post('/Home/Api/distribute?apiid=opinion', body);
}

// 获取消息列表
const getMessageList = async () => {
    return axios.post('/Home/Api/distribute?apiid=news_list');
}

// 安全中心 -> 身份认证
const certificatePerson = async (numberid, name) => {
    const body = {
        numberid,
        name
    };
    return axios.post('/Home/Api/distribute?apiid=numberid', body);
}

export {
    certificatePerson,
    getMessageList,
    sendSuggest,
}
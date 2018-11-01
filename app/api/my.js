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

// 获取全部订单，我的订单和申请理赔都用这个接口，后端说的
const getAllOrder = async () => {
    return axios.post('/Home/Api/distribute?apiid=insur_order');
}

export {
    getAllOrder,
    sendSuggest,
}

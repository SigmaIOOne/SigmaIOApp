import axios from './helper';

// 获取全部订单，我的订单和申请理赔都用这个接口，后端说的
const getAllOrder = async () => {
    return axios.post('/Home/Api/distribute?apiid=insur_order');
}

// 查看订单详情
const getOrderdetails = async (id) => {
    const body = {
        id,
    };
    return axios.post('/Home/Api/distribute?apiid=insur_details', body);
}

// 购买产品接口, body是一个对象，因为有三个产品，里面需要填写的不一样，所以干脆传一个对象进来
const buyProduct = async (body) => {
    return axios.post('/Home/Api/distribute?apiid=insur', body);
}

export {
    buyProduct,
    getAllOrder,
    getOrderdetails,
}

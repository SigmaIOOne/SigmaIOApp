import axios from './helper';

const test = async () => {
    return axios.post('/Admin/Index/verify');
};

export {
    test,
}
/**
 * Created by superman on 17/2/16.
 * axios配置
 */
import axios from 'axios';
import store from '../store/index';
import { serverUrl } from '../utils/config';
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = serverUrl;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            // 请求默认携带当前时间戳
            const time = +new Date();
            config.data = {
                time,
                ...config.data
            };
            console.log('config ------- ', config);
        }
        return config;
    },
    err => {
        // 请求超时
        return Promise.reject(err)
    },
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // return response
        store.dispatch({
            type: 'dbc/netInfo/CHANGE_NET_CONNECT_STATE',
            payload: {newState: true}
        });
        console.log('response ----- ', response.data);
        return response;
    },
    error => {
        if (!error.response) {
            // 断网了,改变netInfo里的网络状态
            store.dispatch({
                type: 'dbc/netInfo/CHANGE_NET_CONNECT_STATE',
                payload: {newState: false}
            });
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        // return Promise.reject(error.response.data)
    },
)

export default axios;

import axios from 'axios';
import store from '../../store'

/**
 * 携带令牌 get请求
 * @param {请求地址 | string} url 
 * @param {提交的数据 | object} params 
 */

function get(url, params = {}) {
    // 本地存储方式
    // const token = sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            headers: {//写的token信息请求
                'Authorization': store.state.adminUser.token
            }
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
}
/**
 * 携带令牌 post请求
 * @param {请求地址 | string} url 
 * @param {提交的数据 | object} data 
 */

function post(url, data = {}) {
    // const token = sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data,
            headers: {//写的token信息请求
                'Authorization': store.state.adminUser.token
            }
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
}

export default { get, post }
import axios from 'axios';
// 获取用户登录的token信息
// const token = sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : '';


/**
 * 携带令牌 get请求
 * @param {请求地址 | string} url 
 * @param {提交的数据 | object} params 
 */

function get(url, params = {}) {
    const token = sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            params,
            headers: {//写的token信息请求
                'Authorization': token
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
    const token = sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")).token : '';
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            data,
            headers: {//写的token信息请求
                'Authorization': token
            }
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
}

export default { get, post }
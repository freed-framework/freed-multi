/**
 * @file http.js
 * @author lihuanji
 *
 *  http fetch方法封装
 */

import 'whatwg-fetch'; // https://github.com/github/fetch
import { Toast, Modal } from 'antd-mobile';
import Native from '../../native';
import { util, isMobile } from '../../index';

let loading = null;
let errorAlert = null;
const requestingList = [];

function createLoading(url) {
    requestingList.push(url);
    if (!loading) {
        if (requestingList.length > 0 && !loading) {
            try {
                Toast.loading('加载中', 0);
            } catch (ex) {
                // Do nothing
            }
            loading = true;
        }
    }
    return () => {
        if (requestingList.indexOf(url) > -1) {
            requestingList.splice(requestingList.indexOf(url), 1);
        }
        if (requestingList.length === 0 && loading) {
            Toast.hide();
            loading = null;
        }
    }
}

/**
 * 成功请求
 *
 * @param data 返回数据
 * @param resolve
 * @param reject
 * @param onError  错误方法
 */
function handleResult(data, resolve, reject, onError) {
    // 后端状态码，可用于处理业务错误
    const status = data.code;
    switch (status) {
        case 200:
            resolve(data);
            break;
        default:
            if (onError) {
                onError(data, status);
            } else {
                Toast.info(typeof data.message === 'string' ? data.message : '服务器错误');
                reject(data);
            }
            break;
    }
}

/**
 * 错误处理
 *
 * http状态 比如 401 404处理
 *
 * @param error httpStatus
 */
function handleError(error) {
    switch (error) {
        case 401:
            if (!errorAlert) {
                Modal.alert('', '登录超时,请重新登录.', [
                    {
                        text: '重新登录',
                        onPress: () => {
                            Native.handleError('401');
                        }
                    }
                ]);

                errorAlert = true;
            }
            break;
        case 404:
            Toast.info('404');
            break;
        default:
            Toast.info(error);
            break;
    }
}

// 判断网络状态
function isNetwork() {
    Native.networkStatus((status) => {
        if (status === 0) {
            Toast.offline('网络连接失败!');
        }
    });
}

export default class http {
    /**
     * 响应拦截器
     *
     * @param {Function} success 成功回调
     * @param {Function} error 失败回调
     */
    response(success, error) {
        this.success = success || this.success;
        this.error = error || this.error;
    }

    /**
     * 成功拦截
     *
     * @param res
     */
    success = res => (res);

    /**
     * 失败拦截
     *
     * @param err
     */
    error = err => (err);

    /**
     * get 请求
     *
     * @param {string} url 地址
     * @param {object} query 请求参数
     * @param {boolean} noloading 是否关闭loading图标
     * @param {function} onError 单次请求业务错误处理 httpCode 200 情况下 data->code 为非200
     *
     * @return {Promise}
     */
    get(url, query = {}, noloading = false, onError = null) {
        isNetwork();
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        const urlQuery = query;
        urlQuery[`b${new Date().getTime()}`] = 1;
        const queryString = util.parseQuerystring(urlQuery);
        let sendUrl = `${encodeURI(url)}${url.indexOf('?') > 0 ? '&' : '?'}${queryString}`;
        return new Promise((resolve, reject) => {
            // 安卓需要加上http:// 原生才能拦截
            if (isMobile.android.phone) {
                sendUrl = `http://${window.location.host}${sendUrl}`;
            }
            fetch(sendUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    token: true,
                }
            })
                .then((response) => {
                    const { status } = response;

                    if (status === 200) {
                        return response.json();
                    }

                    throw status;
                })
                .then(res => {
                    closeLoading();
                    return this.success(res);
                })
                .then((data) => {
                    if (data) {
                        handleResult(data, resolve, reject, onError);
                    }
                })
                .catch((error) => {
                    closeLoading();
                    if (this.error(error)) {
                        handleError(error, reject);
                    }
                })
        })
    }

    /**
     * post 请求
     *
     * @param {string} url 地址
     * @param {object} options 请求参数
     * @param {boolean} noloading 是否关闭loading图标
     * @param {function} onError 单次请求业务错误处理 httpCode 200 情况下 data->code 为非200
     *
     * @return {Promise}
     */
    post(url, options, noloading = false, onError = null) {
        isNetwork();
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        let sendUrl = url;
        return new Promise((resolve, reject) => {
            // 安卓需要加上http:// 原生才能拦截  postBody为原生拦截参数
            if (isMobile.android.phone) {
                let opt = JSON.stringify(options);
                // 安卓特殊处理 %
                if (typeof opt === 'string') {
                    opt = opt.replace('%', '%25')
                }
                sendUrl = `http://${window.location.host}${url}?postBody=${opt}`;
            }

            // 如果是苹果ios post带上postBody
            if (isMobile.apple.phone) {
                sendUrl = `${sendUrl}?postBody=${JSON.stringify(options)}`;
            }
            fetch(sendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    token: true,
                },
                body: JSON.stringify(options)
            })
                .then((response) => {
                    const { status } = response;

                    if (status === 200) {
                        return response.json();
                    }

                    throw status;
                })
                .then(res => {
                    closeLoading();
                    return this.success(res);
                })
                .then((data) => {
                    if (data) {
                        handleResult(data, resolve, reject, onError);
                    }
                })
                .catch((error) => {
                    closeLoading();
                    if (this.error(error)) {
                        handleError(error, reject);
                    }
                })
        })
    }
}

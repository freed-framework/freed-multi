/**
 * @file util.js
 * @author lihuanji
 *
 * 基础工具
 */

import queryString from 'query-string';

/**
 * 转换url参数
 *
 * @param {Object} obj
 * @returns {string} a=*&b=**
 */
function parseQuerystring(obj) {
    let result = '';
    if (obj) {
        const tmp = [];
        const key = Object.keys(obj);

        key.forEach((k) => {
            tmp.push(`${k}=${encodeURIComponent(obj[k])}`);
        });

        result = tmp.join('&');
    }

    return result;
}

/**
 * 获取url上参数
 *
 * @param {string} key 需要获取的参数 key
 * @param {boolean} isDecode 是否需要转码
 *
 * @return {string} 值
 */
function getQueryString(key, isDecode = true) {
    const val = queryString.parse(window.location.search)[key];

    if (isDecode && val != null) {
        return decodeURIComponent(val);
    }

    return val;
}

/**
 * post请求转码参数
 *
 * @param {Object} obj
 * @returns {Object} obj
 */
function parsePostQuery(obj) {
    const result = {};
    if (obj) {
        const key = Object.keys(obj);

        key.forEach((k) => {
            result[k] = encodeURIComponent(obj[k]);
        });
    }

    return result;
}

export default {
    parseQuerystring,
    getQueryString,
    parsePostQuery,
};

/**
 * @file notification.js
 * @author lihuanji
 *
 * 广播事件 用于跨页面传数据
 *
 * 列如 A -> B -> C
 *  C传数据给A
 */

import deviceready from './deviceready';

/**
 * 发出通知
 *
 * @param {string} key 通知key
 * @param {object} data 传递数据
 */
const emit = (key, data) => {
    deviceready.then(() => window.YTNotification.emit(key, typeof data === 'string' ? data : JSON.stringify(data)));
};

/**
 * 接收通知
 *
 * @param {string} key 接收通知key
 * @param {object} data 回传数据
 */
const listen = (key, data) => {
    deviceready.then(() => window.YTNotification.listen(key, data));
};

export default {
    emit,
    listen
};

/**
 * @file networkStatus.js
 * @author lihuanji
 *
 * 检查网络状态
 *
 * 0:无网络, 1: Wifi, 2: 3/4G
 */

import deviceready from './deviceready';

/**
 * 检查网络状态
 *
 * @param {function} callback 回调函数
 */
export default (callback) => {
    deviceready.then(() => window.YTNetwork.checkStatus((status) => {
        callback(status);
    }));
};

/**
 * @file goBack.js
 * @author lihuanji
 *
 * 返回
 */

import deviceready from './deviceready';

/**
 * 返回上一个 webview
 *
 * @param {Object} data 传回上一个页面的数据
 */
export default (data) => {
    deviceready.then(() => {
        const info = data || '';
        window.YTNavigation.goBack(typeof info === 'string' ? info : JSON.stringify(info));
    });
};

/**
 * @file redirect.js
 * @author lihuanji
 *
 * 跳转
 */

import deviceready from './deviceready';

/**
 * 跳转 webview
 *
 * @param {string} url 跳转url
 * @param {Object} options 配置参数
 */
export default (url, options) => {
    if (!url) {
        return;
    }
    deviceready.then(() => window.YTNavigation.redirect(url, options));
};

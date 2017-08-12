/**
 * @file handleError.js
 * @author lihuanji
 *
 * 处理业务逻辑错误
 */

import deviceready from './deviceready';

/**
 * 401 -> token过期
 *
 * @param {string} errCode 错误码
 */
export default (errCode) => {
    deviceready.then(() => {
        window.YTLogicService.handleError(errCode);
    });
};

/**
 * @file deepLink.js
 * @author lihuanji
 *
 * 跨模块跳转
 */

import deviceready from './deviceready';
import { util } from '../index';

/**
 *
 * @param options 配置参数
 *        moduleID  {number} 模块ID
 *        moduleKey {string} 模块落地key
 *        param {object} 传入参数
 *        transition {string} 跳转动画  right bottom
 *        closeSelf {boolean} 是否关闭当前页
 * @param success 成功回调
 * @param fail 失败回调
 */
export default (options, success, fail) => {
    deviceready.then(() => {
        const queryString = util.parseQuerystring(options.param);
        window.YTNavigation.deepLinkRedirect(
            `xcr://${options.moduleID}/${options.moduleKey}?${queryString}`,
            {
                transition: options.transition || 'right',
                closeSelf: options.closeSelf || false,
            },
            success,
            fail,
        );
    });
};

/**
 * @file popAllPage.js
 * @author lihuanji
 *
 *  推出所有 直接回到APP应用列表
 */

import deviceready from './deviceready';

export default () => {
    deviceready.then(() => window.YTNavigation.popAllPage());
};

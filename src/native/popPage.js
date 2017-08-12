/**
 * @file popPage.js
 * @author lihuanji
 *
 * A -> B -> C
 *
 * B调用 推出C
 */


import deviceready from './deviceready';

/**
 * 推出之后页面
 *
 * @param {boolean} isCurrent 是否推出自己
 */
export default (isCurrent) => {
    deviceready.then(() => window.YTNavigation.popPage(isCurrent));
};

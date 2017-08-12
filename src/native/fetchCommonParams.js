/**
 * @file fetchCommonParams.js
 * @author lihuanji
 *
 * 获取信息
 */

import deviceready from './deviceready';

/**
 * 返回字段
 * userName: 用户名
 * cityName: 所在城市
 * avatarUrl: 头像链接
 * ip: 用户当前ip
 *
 */
export default (callback) => {
    deviceready.then(() => {
        window.YTLogicService.fetchCommonParams((info) => {
            callback(info);
        });
    });
};

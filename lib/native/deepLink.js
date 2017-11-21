'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/**
 * @file deepLink.js
 * @author lihuanji
 *
 * 跨模块跳转
 */

exports.default = function (options, success, fail) {
    _deviceready2.default.then(function () {
        var queryString = _index.util.parseQuerystring(options.param);
        window.YTNavigation.deepLinkRedirect('xcr://' + options.moduleID + '/' + options.moduleKey + '?' + queryString, {
            transition: options.transition || 'right',
            closeSelf: options.closeSelf || false
        }, success, fail);
    });
};
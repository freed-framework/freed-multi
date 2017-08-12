'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 返回字段
 * userName: 用户名
 * cityName: 所在城市
 * avatarUrl: 头像链接
 * ip: 用户当前ip
 *
 */
exports.default = function (callback) {
    _deviceready2.default.then(function () {
        window.YTLogicService.fetchCommonParams(function (info) {
            callback(info);
        });
    });
}; /**
    * @file fetchCommonParams.js
    * @author lihuanji
    *
    * 获取信息
    */
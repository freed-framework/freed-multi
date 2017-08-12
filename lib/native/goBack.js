'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 返回上一个 webview
 *
 * @param {Object} data 传回上一个页面的数据
 */
exports.default = function (data) {
    _deviceready2.default.then(function () {
        var info = null;
        if (data) {
            info = typeof data === 'string' ? data : (0, _stringify2.default)(data);
        }
        window.YTNavigation.goBack(info);
    });
}; /**
    * @file goBack.js
    * @author lihuanji
    *
    * 返回
    */
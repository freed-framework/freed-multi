'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file deviceready.js
 * @author lihuanji
 *
 * 设备就绪 deviceready
 * 调用原生方法之前判断
 */

exports.default = new _promise2.default(function (resolve) {
    document.addEventListener('deviceready', function () {
        resolve();
    }, false);
});
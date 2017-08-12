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
 * 发出通知
 *
 * @param {string} key 通知key
 * @param {object} data 传递数据
 */
var emit = function emit(key, data) {
  _deviceready2.default.then(function () {
    return window.YTNotification.emit(key, typeof data === 'string' ? data : (0, _stringify2.default)(data));
  });
};

/**
 * 接收通知
 *
 * @param {string} key 接收通知key
 * @param {object} data 回传数据
 */
/**
 * @file notification.js
 * @author lihuanji
 *
 * 广播事件 用于跨页面传数据
 *
 * 列如 A -> B -> C
 *  C传数据给A
 */

var listen = function listen(key, data) {
  _deviceready2.default.then(function () {
    return window.YTNotification.listen(key, data);
  });
};

exports.default = {
  emit: emit,
  listen: listen
};
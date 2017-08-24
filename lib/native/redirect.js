'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 跳转 webview
 *
 * @param {string} url 跳转url
 * @param {Object} options 配置参数
 */
exports.default = function (url, options) {
  if (!url) {
    return;
  }
  _deviceready2.default.then(function () {
    return window.YTNavigation.redirect(url, options);
  });
}; /**
    * @file redirect.js
    * @author lihuanji
    *
    * 跳转
    */
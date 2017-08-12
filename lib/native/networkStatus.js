'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 检查网络状态
 *
 * @param {function} callback 回调函数
 */
exports.default = function (callback) {
  _deviceready2.default.then(function () {
    return window.YTNetwork.checkStatus(function (status) {
      callback(status);
    });
  });
}; /**
    * @file networkStatus.js
    * @author lihuanji
    *
    * 检查网络状态
    *
    * 0:无网络, 1: Wifi, 2: 3/4G
    */
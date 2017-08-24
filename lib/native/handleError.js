'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 401 -> token过期
 *
 * @param {string} errCode 错误码
 */
exports.default = function (errCode) {
  _deviceready2.default.then(function () {
    window.YTLogicService.handleError(errCode);
  });
}; /**
    * @file handleError.js
    * @author lihuanji
    *
    * 处理业务逻辑错误
    */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 推出之后页面
 *
 * @param {boolean} isCurrent 是否推出自己
 */
exports.default = function (isCurrent) {
  _deviceready2.default.then(function () {
    return window.YTNavigation.popPage(isCurrent);
  });
}; /**
    * @file popPage.js
    * @author lihuanji
    *
    * A -> B -> C
    *
    * B调用 推出C
    */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _deviceready2.default.then(function () {
    return window.YTNavigation.popAllPage();
  });
}; /**
    * @file popAllPage.js
    * @author lihuanji
    *
    *  推出所有 直接回到APP应用列表
    */
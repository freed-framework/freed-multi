'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 扫一扫接口
 *
 * @param {string} title 显示标题
 * @param {function} callback 成功扫描回调
 */
exports.default = function () {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var callback = arguments[1];

  _deviceready2.default.then(function () {
    return window.YTBarcodeScanner.scan(title, callback);
  });
}; /**
    * @file scan.js
    * @author lihuanji
    *
    * 扫一扫
    */
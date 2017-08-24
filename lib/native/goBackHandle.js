'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @file goBackHandle.js
 * @author lihuanji
 *
 * 监听安卓物理建返回
 */

/**
 * 返回
 *
 * @param {Function} callback 点击回调
 * @param {boolean}  isIntercept 是否监听
 */
exports.default = function (callback) {
  var isIntercept = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!/(iphone|ipad)/i.test(navigator.appVersion) && isIntercept) {
    document.addEventListener('backbutton', callback, false);
  }
};
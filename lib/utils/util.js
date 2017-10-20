'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 转换url参数
 *
 * @param {Object} obj
 * @returns {string} a=*&b=**
 */
function parseQuerystring(obj) {
    var result = '';
    if (obj) {
        var tmp = [];
        var key = (0, _keys2.default)(obj);

        key.forEach(function (k) {
            tmp.push(k + '=' + encodeURIComponent(obj[k]));
        });

        result = tmp.join('&');
    }

    return result;
}

/**
 * 获取url上参数
 *
 * @param {string} key 需要获取的参数 key
 * @param {boolean} isDecode 是否需要转码
 *
 * @return {string} 值
 */
/**
 * @file util.js
 * @author lihuanji
 *
 * 基础工具
 */

function getQueryString(key) {
    var isDecode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var val = _queryString2.default.parse(window.location.search)[key];

    if (isDecode && val != null) {
        return decodeURIComponent(val);
    }

    return val;
}

/**
 * post请求转码参数
 *
 * @param {Object} obj
 * @returns {Object} obj
 */
function parsePostQuery(obj) {
    var result = {};
    if (obj) {
        var key = (0, _keys2.default)(obj);

        key.forEach(function (k) {
            result[k] = encodeURIComponent(obj[k]);
        });
    }

    return result;
}

exports.default = {
    parseQuerystring: parseQuerystring,
    getQueryString: getQueryString,
    parsePostQuery: parsePostQuery
};
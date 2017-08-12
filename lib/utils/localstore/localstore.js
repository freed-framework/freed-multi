'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file localstore.js
 * @author denglingbo
 *
 */

var store = window.localStorage;

var LocalStore = function () {
    function LocalStore() {
        (0, _classCallCheck3.default)(this, LocalStore);
    }

    (0, _createClass3.default)(LocalStore, null, [{
        key: 'set',

        /**
         * 设置数据, 如果 value 是 object，会调用 JSON.stringify 自动转换为字符串
         * @param key
         * @param value
         */
        value: function set(key, value) {
            if (!store) {
                return;
            }

            var v = value;

            try {
                if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
                    v = (0, _stringify2.default)(v);
                }

                store.setItem(key, v);
            } catch (ex) {
                // Do something
            }
        }

        /**
         * 直接获取 localStorage 中的原始数据
         * @param key
         * @return {string|null}
         */

    }, {
        key: 'get',
        value: function get(key) {
            if (!store) {
                return null;
            }

            return store.getItem(key);
        }

        /**
         * 获取数据同时转换为 JSON
         * @param key
         * @return {null}
         */

    }, {
        key: 'get2Json',
        value: function get2Json(key) {
            if (!store) {
                return null;
            }

            var data = store.getItem(key);

            try {
                return JSON.parse(data);
            } catch (ex) {
                // Do something
            }

            return null;
        }

        /**
         * 获取所有数据
         * @return {Storage}
         */

    }, {
        key: 'getAll',
        value: function getAll() {
            if (!store) {
                return null;
            }

            return store;
        }

        /**
         * 移除数据
         * @param key
         */

    }, {
        key: 'remove',
        value: function remove(key) {
            if (!store) {
                return;
            }

            try {
                store.removeItem(key);
            } catch (ex) {
                // Do something
            }
        }
    }]);
    return LocalStore;
}();

exports.default = LocalStore;
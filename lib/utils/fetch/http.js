'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _css = require('antd-mobile/lib/modal/style/css');

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

require('whatwg-fetch');

var _native = require('../../native');

var _native2 = _interopRequireDefault(_native);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/github/fetch
var loading = null; /**
                     * @file http.js
                     * @author lihuanji
                     *
                     *  http fetch方法封装
                     */

var errorAlert = null;
var requestingList = [];

function createLoading(url) {
    requestingList.push(url);
    if (!loading) {
        if (requestingList.length > 0 && !loading) {
            _toast2.default.loading('加载中', 0);
            loading = true;
        }
    }
    return function () {
        if (requestingList.indexOf(url) > -1) {
            requestingList.splice(requestingList.indexOf(url), 1);
        }
        if (requestingList.length === 0 && loading) {
            _toast2.default.hide();
            loading = null;
        }
    };
}

/**
 * 成功请求
 *
 * @param data 返回数据
 * @param resolve
 * @param reject
 * @param onError  错误方法
 */
function handleResult(data, resolve, reject, onError) {
    // 后端状态码，可用于处理业务错误
    var status = data.code;
    switch (status) {
        case 200:
            resolve(data);
            break;
        default:
            if (onError) {
                onError(data, status);
            } else {
                _toast2.default.info(typeof data.message === 'string' ? data.message : '服务器错误');
                reject(data);
            }
            break;
    }
}

/**
 * 错误处理
 *
 * http状态 比如 401 404处理
 *
 * @param error httpStatus
 */
function handleError(error) {
    switch (error) {
        case 401:
            if (!errorAlert) {
                _modal2.default.alert('', '登录超时,请重新登录.', [{
                    text: '重新登录',
                    onPress: function onPress() {
                        _native2.default.handleError('401');
                    }
                }]);

                errorAlert = true;
            }
            break;
        case 404:
            _toast2.default.info('404');
            break;
        default:
            _toast2.default.info(error);
            break;
    }
}

// 判断网络状态
function isNetwork() {
    _native2.default.networkStatus(function (status) {
        if (status === 0) {
            _toast2.default.offline('网络连接失败!');
        }
    });
}

var http = function () {
    function http() {
        (0, _classCallCheck3.default)(this, http);

        this.success = function (res) {
            return res;
        };

        this.error = function (err) {
            return err;
        };
    }

    (0, _createClass3.default)(http, [{
        key: 'response',

        /**
         * 响应拦截器
         *
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        value: function response(success, error) {
            this.success = success || this.success;
            this.error = error || this.error;
        }

        /**
         * 成功拦截
         *
         * @param res
         */


        /**
         * 失败拦截
         *
         * @param err
         */

    }, {
        key: 'get',


        /**
         * get 请求
         *
         * @param {string} url 地址
         * @param {object} query 请求参数
         * @param {boolean} noloading 是否关闭loading图标
         * @param {function} onError 单次请求业务错误处理 httpCode 200 情况下 data->code 为非200
         *
         * @return {Promise}
         */
        value: function get(url) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _this = this;

            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var onError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            isNetwork();
            var closeLoading = function closeLoading() {};
            if (!noloading) {
                closeLoading = createLoading(url);
            }
            var urlQuery = query;
            urlQuery['b' + new Date().getTime()] = 1;
            var queryString = _index.util.parseQuerystring(urlQuery);
            var sendUrl = '' + encodeURI(url) + (url.indexOf('?') > 0 ? '&' : '?') + queryString;
            return new _promise2.default(function (resolve, reject) {
                // 安卓需要加上http:// 原生才能拦截
                if (_index.isMobile.android.phone) {
                    sendUrl = 'http://' + window.location.host + sendUrl;
                }
                fetch(sendUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        token: true
                    }
                }).then(function (response) {
                    var status = response.status;


                    if (status === 200) {
                        return response.json();
                    }

                    throw status;
                }).then(function (res) {
                    closeLoading();
                    return _this.success(res);
                }).then(function (data) {
                    if (data) {
                        handleResult(data, resolve, reject, onError);
                    }
                }).catch(function (error) {
                    closeLoading();
                    if (_this.error(error)) {
                        handleError(error, reject);
                    }
                });
            });
        }

        /**
         * post 请求
         *
         * @param {string} url 地址
         * @param {object} options 请求参数
         * @param {boolean} noloading 是否关闭loading图标
         * @param {function} onError 单次请求业务错误处理 httpCode 200 情况下 data->code 为非200
         *
         * @return {Promise}
         */

    }, {
        key: 'post',
        value: function post(url, options) {
            var _this2 = this;

            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var onError = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            isNetwork();
            var closeLoading = function closeLoading() {};
            if (!noloading) {
                closeLoading = createLoading(url);
            }
            var sendUrl = url;
            return new _promise2.default(function (resolve, reject) {
                // 安卓需要加上http:// 原生才能拦截  postBody为原生拦截参数
                if (_index.isMobile.android.phone) {
                    var opt = (0, _stringify2.default)(options);
                    // 安卓特殊处理 %
                    sendUrl = 'http://' + window.location.host + url + '?postBody=' + opt.replace('%', '%25');
                }

                // 如果是苹果ios post带上postBody
                if (_index.isMobile.apple.phone) {
                    sendUrl = sendUrl + '?postBody=' + (0, _stringify2.default)(options);
                }
                fetch(sendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        token: true
                    },
                    body: (0, _stringify2.default)(options)
                }).then(function (response) {
                    var status = response.status;


                    if (status === 200) {
                        return response.json();
                    }

                    throw status;
                }).then(function (res) {
                    closeLoading();
                    return _this2.success(res);
                }).then(function (data) {
                    if (data) {
                        handleResult(data, resolve, reject, onError);
                    }
                }).catch(function (error) {
                    closeLoading();
                    if (_this2.error(error)) {
                        handleError(error, reject);
                    }
                });
            });
        }
    }]);
    return http;
}();

exports.default = http;
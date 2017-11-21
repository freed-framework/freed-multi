'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

var _redirect = require('./redirect');

var _redirect2 = _interopRequireDefault(_redirect);

var _goBack = require('./goBack');

var _goBack2 = _interopRequireDefault(_goBack);

var _goBackHandle = require('./goBackHandle');

var _goBackHandle2 = _interopRequireDefault(_goBackHandle);

var _popPage = require('./popPage');

var _popPage2 = _interopRequireDefault(_popPage);

var _popAllPage = require('./popAllPage');

var _popAllPage2 = _interopRequireDefault(_popAllPage);

var _pay = require('./pay');

var _pay2 = _interopRequireDefault(_pay);

var _networkStatus = require('./networkStatus');

var _networkStatus2 = _interopRequireDefault(_networkStatus);

var _fetchCommonParams = require('./fetchCommonParams');

var _fetchCommonParams2 = _interopRequireDefault(_fetchCommonParams);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _deepLink = require('./deepLink');

var _deepLink2 = _interopRequireDefault(_deepLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index.js
 * @author lihuanji
 *
 *  封装原生交互api
 */

var Native = {
    deviceready: _deviceready2.default,
    redirect: _redirect2.default,
    goBack: _goBack2.default,
    goBackHandle: _goBackHandle2.default,
    popPage: _popPage2.default,
    popAllPage: _popAllPage2.default,
    pay: _pay2.default,
    networkStatus: _networkStatus2.default,
    fetchCommonParams: _fetchCommonParams2.default,
    handleError: _handleError2.default,
    notification: _notification2.default,
    deepLink: _deepLink2.default
};

exports.default = Native;
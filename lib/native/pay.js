'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/modal/style/css');

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _deviceready = require('./deviceready');

var _deviceready2 = _interopRequireDefault(_deviceready);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 微信支付需要的payInfo数据
 * {
 *   partnerId: {string} 商家Id
 *   prepayId: {string} 预支付订单Id
 *   noncestr: {string} 随机串，防重发
 *   timestamp: {string} 时间戳，防重发
 *   package: {string} 商家根据财付通文档填写的数据和签名
 *   sign: {string} 商家根据微信开放平台文档对数据做的签名
 * }
 *
 * 支付宝数据
 * {
 *   prePayInfo:
 *   payNo:
 *   payType:
 * }
 */

/**
 * 调用原生支付插件
 *
 * @param {string} payType 支付类型（"weixin": "微信支付"；"alipay": "支付宝"；"ytpay": "雅堂金融"）
 * @param {string} payInfo 支付数据
 * @param {function} result 支付回调
 */
/**
 * @file pay.js
 * @author lihuanji
 *
 * 支付接口
 */

exports.default = function (payType, payInfo, result) {
    _deviceready2.default.then(function () {
        switch (payType) {
            case 'alipay':
                window.YTPay.alipay(payInfo.prePayInfo, function (info) {
                    result('success', info);
                }, function (info) {
                    result('fail', info);
                });
                break;
            case 'weixin':
                window.YTPay.wxpay({
                    partnerId: payInfo.partnerid,
                    prepayId: payInfo.prepayid,
                    noncestr: payInfo.nnoncestr,
                    timestamp: payInfo.timestamp,
                    package: payInfo.package,
                    sign: payInfo.sign
                }, function (info) {
                    result('success', info);
                }, function (info) {
                    result('fail', info);
                });
                break;
            case 'ytpay':
                try {
                    window.YTPay.jrpay(payInfo.prePayInfo, function (info) {
                        result('success', info);
                    }, function (info) {
                        result('fail', info);
                    });
                } catch (e) {
                    _modal2.default.alert('提示', '当前APP版本不支持该支付方式，请升级APP版本！');
                }
                break;
            default:
                break;
        }
    });
};
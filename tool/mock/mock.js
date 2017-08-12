/**
 * @file mock.js
 * @author lihuanji
 *
 *  mock路由
 */

var lodash  = require('lodash');
var express = require('express');
var Mock = require('mockjs');

function MockUtil() {
    this.routers = [];
}

function getTimeout(timeout) {
    if (typeof timeout === 'number') return timeout
    if (typeof timeout === 'string' && !~timeout.indexOf('-')) return parseInt(timeout, 10)
    if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
        var tmp = timeout.split('-')
        var min = parseInt(tmp[0], 10)
        var max = parseInt(tmp[1], 10)
        return Math.round(Math.random() * (max - min)) + min
    }
};

MockUtil.prototype.addRouter = function(method, url, data, httpStatus, neverRemote, timeout) {
    method = method || 'get';
    var r = express.Router();
    httpStatus = httpStatus ? httpStatus : 200;
    r[method.toLowerCase()](url, function (req, res, next) {
        setTimeout(function () {
            res.status(httpStatus).send(
                JSON.stringify(Mock.mock(data))
            );
        }, getTimeout(timeout));
    });
    this.routers.push(r);
};

MockUtil.prototype.addRouters = function(routers, prefix, timeout) {
    prefix = prefix || '';
    for(var i = 0, len = routers.length; i < len; i++) {
        var router = routers[i];
        this.addRouter(
            router.method,
            prefix + router.url,
            router.data,
            router.httpStatus || 200,
            !!router.neverRemote,
            timeout
        );
    }
};

MockUtil.prototype.getRouters = function() {
    return this.routers;
};

module.exports = MockUtil;
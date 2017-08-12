/**
 * @file cordova.js
 * @author lihuanji
 *
 *  模拟原生api，以后可能会用于wap
 */

setTimeout(function() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('deviceready', true, true);
    document.dispatchEvent(evt);
}, 100);

window.YTNavigation = {
    goBack: function (data) {
        window.history.go(-1);
    },
    redirect: function (url, options) {
        window.location.href = `/${url}`;
    },
    popPage: function () {},
    popAllPage: function () {}
};

window.YTNetwork = {
    checkStatus: function (callback) {
        callback(2);
    }
};

window.YTLogicService = {
    fetchCommonParams: function (callback) {
        callback({
            userName: '张三',
            userId: '111',
            avatarUrl: 'https://dummyimage.com/139x139/fff/000',
            cityName: '成都',
            ip: '172.0.0.1'
        })
    },
    handleError: function () {
        alert('401');
    }
};

window.YTPay = {
    pay: function (payType, payInfo, result) {
        alert('调用支付插件');
        result('success');
    }
};

window.YTNotification = {
    emit: function () {},
    listen: function () {}
};

/**
 * @file server.js
 * @author lihuanji
 *
 *  mock server
 */

const express = require('express');
const path = require('path');
const application = express();
const MockUtil = require('../../tool/mock/mock');
const mockUtil = new MockUtil();

module.exports = function (ROOT_PATH, port, timeout) {
    // 获取项目内部mock router
    const router = require(path.resolve(ROOT_PATH, './mock/index'));

    mockUtil.addRouters(router, '', timeout);

    application.use(mockUtil.getRouters());

    application.listen(port, () => {
        console.log(`mock启动成功，端口${port}`);
    });
};
/**
 * @file scan.js
 * @author lihuanji
 *
 * 扫一扫
 */

import deviceready from './deviceready';

/**
 * 扫一扫接口
 *
 * @param {string} title 显示标题
 * @param {function} callback 成功扫描回调
 */
export default (title = '', callback) => {
    deviceready.then(() => window.YTBarcodeScanner.scan(title, callback));
};

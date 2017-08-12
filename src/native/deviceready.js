/**
 * @file deviceready.js
 * @author lihuanji
 *
 * 设备就绪 deviceready
 * 调用原生方法之前判断
 */

export default new Promise((resolve) => {
    document.addEventListener('deviceready', () => {
        resolve();
    }, false);
});

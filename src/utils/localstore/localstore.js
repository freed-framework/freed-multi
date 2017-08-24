/**
 * @file localstore.js
 * @author denglingbo
 *
 */

const store = window.localStorage;

class LocalStore {
    /**
     * 设置数据, 如果 value 是 object，会调用 JSON.stringify 自动转换为字符串
     * @param key
     * @param value
     */
    static set(key, value) {
        if (!store) {
            return;
        }

        let v = value;

        try {
            if (typeof value === 'object') {
                v = JSON.stringify(v);
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
    static get(key) {
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
    static get2Json(key) {
        if (!store) {
            return null;
        }

        const data = store.getItem(key);

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
    static getAll() {
        if (!store) {
            return null;
        }

        return store;
    }

    /**
     * 移除数据
     * @param key
     */
    static remove(key) {
        if (!store) {
            return;
        }

        try {
            store.removeItem(key);
        } catch (ex) {
            // Do something
        }
    }
}

export default LocalStore;

/**
 * @file dev.server.js
 * @author lihuanji
 *
 *  dev server
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const mockServer = require('./tool/mock/server');

// 项目路径
const ROOT_PATH = process.cwd();

/**
 * 引入构建配置
 */
const webpackConfig = require('./make-webpack.config');

/**
 * 引入代理
 * @type {nproxy}
 */
const nporxy = require('./tool/proxy/nproxy');

function startProxy(proxyConfig) {
    // 启动 代理服务
    nporxy(proxyConfig.port, proxyConfig);
}


module.exports = function (options) {
    if (!options) {
        options = {
            mockConfig: {},
            devConfig: {},
        };
    }

    const isMock = options.mockConfig.mock;

    const devConfig = {
        publicPath: '/',
        host: '0.0.0.0',
        port: 8899,
        // 开启服务器的模块热替换（HMR）
        hot: true,
        inline: true,
        historyApiFallback: {
            index: '/'
        },
        stats: {
            colors: true
        },
        disableHostCheck: true,
        proxy: {}
    };

    Object.assign(devConfig, options.devConfig);

    // 启动代理服务
    if (options.proxyConfig !== false && !isMock) {
        const proxyConfig = {
            host: '',
            port: '9999',
            rules: []
        };

        Object.assign(proxyConfig, options.proxyConfig);

        startProxy(proxyConfig);
    }

    /**
     *  webpack打包配置
     */
    const compiler = webpack(webpackConfig(options));

    /**
     * webpack dev server 配置
     */
    const server = new WebpackDevServer(compiler, devConfig);

    /**
     * 启动本地服务环境 devServer
     */
    server.listen(devConfig.port, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log(
                `Listening on port ${devConfig.port} Open up http://localhost:${devConfig.port}/ in your browser.`
            );
        }
    });

    // 启动mock服务
    isMock && mockServer(ROOT_PATH, options.mockConfig.port, options.mockConfig.timeout);
};

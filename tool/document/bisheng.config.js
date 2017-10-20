var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const pxtorem = require('postcss-pxtorem');

function pickerGenerator(module) {
    const tester = new RegExp(`^docs/${module}`);
    return (markdownData) => {
        const filename = markdownData.meta.filename;
        if (tester.test(filename) && !/\.en-US\.md/.test(filename)) {
            return {
                meta: markdownData.meta,
            };
        }
    };
}

module.exports = {
    port: 8001,
    source: [
        './src',
        './docs',
        'CHANGELOG.md', // TODO: fix it in bisheng
    ],
    theme: './tool/document/theme',
    lazyLoad(nodePath, nodeValue) {
        if (typeof nodeValue === 'string') {
            return true;
        }
        return nodePath.endsWith('/demo');
    },
    pick: {
        components(markdownData) {
            const filename = markdownData.meta.filename;
            if (!/^components/.test(filename) ||
                /\/demo$/.test(path.dirname(filename))) return;
            return {
                meta: markdownData.meta,
            };
        },
        changelog(markdownData) {
            if (markdownData.meta.filename === 'CHANGELOG.md') {
                return {
                    meta: markdownData.meta,
                };
            }
        },
        'docs/pattern': pickerGenerator('pattern'),
        'docs/react': pickerGenerator('react'),
    },
    entry: {
        index: {
            theme: './tool/document/theme',
            htmlTemplate: './tool/document/theme/static/template.html',
        },
        'kitchen-sink': {
            theme: './tool/document/mobile',
            htmlTemplate: './tool/document/mobile/static/template.html',
        },
    },
    plugins: [
        'bisheng-plugin-description',
        'bisheng-plugin-toc?maxDepth=2',
        'bisheng-plugin-react?lang=__react',
        'bisheng-plugin-antd',
    ],
    doraConfig: {
        verbose: true,
        plugins: ['dora-plugin-upload'],
    },
    webpackConfig(config) {
        config.module.noParse = [/moment.js/];
        config.resolve.alias = {
            site: path.join(process.cwd(), 'site'),
            components: path.join(process.cwd(), 'components')
        };
        // config.postcss.push(pxtorem({
        //     rootValue: 50,
        //     propWhiteList: [],
        //     selectorBlackList: [/^html$/, /^\.ant-/, /^\.github-/, /^\.gh-/],
        // }));

        config.module.rules.forEach((v) => {
            if (v.loader === 'babel-loader') {
                v.options.presets = [
                    'es2015',
                    'react',
                    'stage-0'
                ]
                v.options.plugins = [
                    'transform-runtime',
                    'transform-decorators-legacy',
                    'babel-plugin-add-module-exports',
                    [
                        'import', {
                            libraryName: 'antd-mobile',
                            style: 'css'
                        }
                    ]
                ]
            }
        });
        // config.babel.plugins.push([
        //     require.resolve('babel-plugin-transform-runtime'),
        //     {
        //         polyfill: false,
        //         regenerator: true,
        //     },
        // ]);

        // config.babel.plugins.push([
        //     require.resolve('babel-plugin-import'),
        //     {
        //         style: true,
        //         libraryName: 'antd-mobile',
        //         libraryDirectory: 'lib',
        //     },
        // ]);
        // config.module = config.module || {loaders: []};
        config.module.rules.push({
            test(filePath) {
                return /\.scss$/.test(filePath) && !/\.module\.scss$/.test(filePath);
            },
            loader: ExtractTextPlugin.extract(
                'css?sourceMap&-autoprefixer!' +
                'postcss-loader!' +
                `sass-loader?{"sourceMap":true}`
            ),
        });
        config.module.rules.push({
            // 图片加载器
            test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
            loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
        })
        config.devtool= 'inline-source-map';
        return config;
    },
};

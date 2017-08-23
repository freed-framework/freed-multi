/**
 * @file make-webpack.config.js
 * @author lihuanji
 *
 *  webpack配置文件
 */

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ObjectAssign = require('object-assign');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 是否生产环境
const isProduct = process.env.NODE_ENV;

// 项目路径
const ROOT_PATH = process.cwd();

// 项目源码路径
const SRC_PATH = `${ROOT_PATH}/src/pages`;

/**
 *  获取入口名字
 *
 * @param filePath
 * @returns {string}
 */
function getEntryName(filePath) {
    // 获取 folderName
    const pathArr = filePath.split('/');
    const len = pathArr.length;

    let folderName = '';

    if (pathArr && pathArr.length >= 2) {
        folderName = pathArr[len - 2];
    }

    if (/^(index)$/.test(folderName)) {
        return folderName;
    }

    return `${folderName}/index`;
}

/**
 *  获取多入口，入口文件统一为entry.js
 *
 * @param srcDir 源码地址
 * @returns {{htmlPlugins: Array, jsEntries: object}}
 */
function getPager(srcDir) {
    const htmlPlugins = [];
    const jsEntries = {};

    // 查找 模板 根目录下的入口文件
    const templates = glob.sync(srcDir + '/**/entry.js');

    templates.forEach((filePath) => {
        // 获取文件夹名字
        const entryName = getEntryName(filePath);

        const conf = {};

        conf.filename = `${entryName}.html`;

        let pagerPath = '.';

        if (entryName.split('/').length > 1) {
            pagerPath = '..'
        }

        conf.path = pagerPath;

        // 模板源位置
        conf.template = path.resolve(__dirname, './common/htmlTemplate');

        // 设置 js 入口
        const chunks = ['load', 'vendor', 'common', entryName];

        conf.chunks = ['load', 'common', 'vendor', entryName];

        conf.chunksSortMode = function (chunk1, chunk2) {
            const orders = chunks;
            const order1 = orders.indexOf(chunk1.names[0]);
            const order2 = orders.indexOf(chunk2.names[0]);
            if (order1 > order2) {
                return 1;
            } else if (order1 < order2) {
                return -1;
            } else {
                return 0;
            }
        };

        // script 插入位置
        conf.inject = 'body';

        htmlPlugins.push(
            new HtmlWebpackPlugin(conf)
        );

        jsEntries[entryName] = filePath;
    });

    return {
        htmlPlugins,
        jsEntries
    };
}

/**
 * 构建入口
 *
 * @param options
 *          {
 *              vendor: {array} // 组件库
 *              production: {boolean} // 是否开发环境
 *          }
 */
module.exports = (options) => {
    if (!options) {
        options = {};
    }

    const pages = getPager(SRC_PATH);

    // 提取组件库
    let vendor = [
        'react', 'react-dom', 'antd-mobile', 'whatwg-fetch', path.resolve(__dirname, './common/fastclick')
    ];

    if (options.vendor) {
        vendor = vendor.concat(options.vendor)
    }

    // 输入
    const entryPoints = ObjectAssign(
        {
            vendor,
        },
        pages.jsEntries
    );

    // 输出目录
    const output = {
        path: path.resolve(ROOT_PATH, './dist/'),
        filename: isProduct ? '[name].min.js' : '[name].js',
        chunkFilename: isProduct ? 'chunk.min.js' : 'chunk.js',
    };

    // rem + css前缀
    const postcssOpts = {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins: () => [
            autoprefixer({
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
            }),
            // pxtorem({
            //     rootValue: 100 * (750 / 750), propWhiteList: []
            // })
            pxtorem({
                rootValue: 100 * (750 / 750),
                unitPrecision: 5,
                propList: ['*'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0
            })
        ],
    };

    // svg去除多余
    const svgoConfig = {
        plugins: [
            { removeTitle: true },
            { convertColors: { shorthex: true } },
            { convertPathData: true },
            { cleanupAttrs: true },
            { removeComments: true },
            { removeDesc: true },
            { removeUselessDefs: true },
            { removeEmptyAttrs: true },
            { removeHiddenElems: true },
            { removeEmptyText: true }
        ]
    };

    const webpackConfig = {
        entry: entryPoints,
        output,
        resolve: {
            modules: [
                path.resolve(ROOT_PATH, './node_modules'),
                path.resolve(__dirname, 'node_modules'),
            ],
            extensions: ['.web.js', '.jsx', '.js', '.json', '.html'],
            alias: {
                native$: path.resolve(__dirname, './lib/native'),
                http$: path.resolve(__dirname, './lib/utils/fetch/http'),
                style$: path.resolve(__dirname, './lib/style')
            }
        },
        plugins: [
            // 提取样式组件
            new ExtractTextPlugin({
                filename: isProduct ? '[name].min.css' : '[name].css',
                disable: false,
                allChunks: true
            }),
            // 拷贝rem，promise js依赖加载文件
            // 拷贝全局css
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './common/lib'),
                    to: path.resolve(ROOT_PATH, './dist/lib'),
                    toType: 'dir'
                },
                {
                    from: path.resolve(__dirname, './common/css'),
                    to: path.resolve(ROOT_PATH, './dist/css'),
                    toType: 'dir'
                }
            ]),
            // 提取所有打包后 js 入口文件中的公共部分
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: Object.keys(entryPoints).filter(key => key !== 'vendor')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
            }),
            new UglifyJSPlugin({
                compress: isProduct
            }),
        ].concat(pages.htmlPlugins),
        module: {
            rules: [
                // js
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                // sass
                {
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'sass-loader'],
                        publicPath: './disk/'
                    })
                },
                // style
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', { loader: 'postcss-loader', options: postcssOpts }],
                        publicPath: './disk/'
                    })
                },
                // svg
                {
                    test: /\.(svg)$/i,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                include: [
                                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
                                    path.resolve(__dirname, 'src/svg-folder'),                // 2. 自己私人的 svg 存放目录
                                ]
                            }
                        },
                        {
                            loader: 'svgo-loader',
                            options: svgoConfig
                        }
                    ],
                },
                // 图片加载器
                {
                    test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                query: {
                                    limit: '10000',
                                    name: 'images/[name]_[hash:7].[ext]',
                                    publicPath: './disk/'
                                }
                            }
                        }
                    ]
                },
            ]
        }
    };

    if (!options.production && !isProduct) {
        webpackConfig.plugins.push(new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './tool/simulate/cordova.js'),
            to: path.resolve(ROOT_PATH, './dist/cordova.js')
        }]));
    }

    return webpackConfig;
};

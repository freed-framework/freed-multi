'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.activeRefresh = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _css = require('antd-mobile/lib/refresh-control/style/css');

var _refreshControl = require('antd-mobile/lib/refresh-control');

var _refreshControl2 = _interopRequireDefault(_refreshControl);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _css2 = require('antd-mobile/lib/list-view/style/css');

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /**
                    * @file ListView.jsx
                    * @author lihuanji
                    *
                    *  长列表
                    *
                    *  1. 瀑布流加载
                    *  2. 下拉刷新
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLazyload = require('react-lazyload');

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _mitt2.default)();

var ListViewComponent = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(ListViewComponent, _PureComponent);

    function ListViewComponent(props) {
        (0, _classCallCheck3.default)(this, ListViewComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListViewComponent.__proto__ || (0, _getPrototypeOf2.default)(ListViewComponent)).call(this, props));

        _this.rData = [];

        var ds = new _listView2.default.DataSource({ rowHasChanged: function rowHasChanged(r1, r2) {
                return r1 !== r2;
            } });

        _this.state = {
            list: ds.cloneWithRows(_this.rData),
            isLoading: true,
            hasMore: true,
            refreshing: false,
            isActiveRefresh: false
        };

        _this.onEndReached = _this.onEndReached.bind(_this);
        _this.getListData = _this.getListData.bind(_this);
        _this.renderRow = _this.renderRow.bind(_this);
        _this.onRefresh = _this.onRefresh.bind(_this);
        _this.activeRefresh = _this.activeRefresh.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ListViewComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.getListData();

            emitter.on('listen', function (promiseFunc) {
                return _this2.activeRefresh(promiseFunc);
            });
        }
    }, {
        key: 'onEndReached',
        value: function onEndReached() {
            if (!this.state.isLoading && !this.state.hasMore) {
                return;
            }

            this.getListData();
        }
    }, {
        key: 'onRefresh',
        value: function onRefresh() {
            var _this3 = this;

            if (this.state.refreshing) {
                return;
            }

            this.setState({ refreshing: true });

            this.props.getRefreshDataFunc().then(function (data) {
                _this3.setState({
                    list: _this3.state.list.cloneWithRows(data),
                    refreshing: false
                });
            });
        }
    }, {
        key: 'getListData',
        value: function getListData() {
            var _this4 = this;

            if (this.state.isActiveRefresh) {
                return;
            }

            this.setState({ isLoading: true });

            this.props.getMoreDataFunc().then(function (data) {
                _this4.rData = [].concat((0, _toConsumableArray3.default)(_this4.rData), (0, _toConsumableArray3.default)(data.data));
                _this4.setState({
                    list: _this4.state.list.cloneWithRows(_this4.rData),
                    isLoading: false,
                    hasMore: data.hasMore
                });
            });
        }

        /**
         * 主动刷新 并且清空之前数据
         * 用于条件发生变化
         *
         * @param promiseFunc
         */

    }, {
        key: 'activeRefresh',
        value: function activeRefresh(promiseFunc) {
            var _this5 = this;

            this.setState({
                isLoading: true,
                isActiveRefresh: true,
                hasMore: true,
                list: this.state.list.cloneWithRows([])
            });

            promiseFunc().then(function (data) {
                _this5.setState({
                    list: _this5.state.list.cloneWithRows(data.data),
                    isLoading: false,
                    hasMore: data.hasMore,
                    isActiveRefresh: false
                });
            });
        }
    }, {
        key: 'renderRow',
        value: function renderRow(rowData) {
            return this.props.renderItemFunc(rowData);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                list = _state.list,
                hasMore = _state.hasMore,
                isLoading = _state.isLoading;
            var _props = this.props,
                id = _props.id,
                className = _props.className,
                isLoadMore = _props.isLoadMore,
                isRefresh = _props.isRefresh,
                _onScroll = _props.onScroll,
                noMoreText = _props.noMoreText;

            var refresh = {};

            if (isRefresh) {
                refresh.refreshControl = _react2.default.createElement(_refreshControl2.default, {
                    refreshing: this.state.refreshing,
                    onRefresh: this.onRefresh
                });

                refresh.scrollerOptions = {
                    scrollbars: true,
                    onScroll: function onScroll() {
                        (0, _reactLazyload.forceCheck)();
                        _onScroll();
                    }
                };

                refresh.useZscroller = true;
            }

            return _react2.default.createElement(
                'div',
                {
                    id: id,
                    className: className,
                    style: { height: 200 }
                },
                _react2.default.createElement(_listView2.default, (0, _extends3.default)({
                    dataSource: list,
                    renderFooter: function renderFooter() {
                        if (!isLoadMore) {
                            return null;
                        }

                        var text = noMoreText;

                        if (hasMore) {
                            text = isLoading ? '加载中...' : '上拉加载更多';
                        }

                        return _react2.default.createElement(
                            'div',
                            { style: { textAlign: 'center' } },
                            text
                        );
                    },
                    style: {
                        height: 'inherit',
                        overflow: 'auto'
                    },
                    scrollRenderAheadDistance: 500,
                    onEndReachedThreshold: 30,
                    renderRow: this.renderRow,
                    onEndReached: isLoadMore ? this.onEndReached : function () {},
                    pageSize: 4,
                    onScroll: _onScroll
                }, refresh))
            );
        }
    }]);
    return ListViewComponent;
}(_react.PureComponent), _class.propTypes = {
    /**
     * id dom节点ID 用于设置高度
     */
    id: _propTypes2.default.string,
    /**
     * class
     */
    className: _propTypes2.default.string,
    /**
     *  渲染单个函数
     */
    renderItemFunc: _propTypes2.default.func.isRequired,
    /**
     * 获取数据函数
     *
     * @return {Promise} object
     *    {
     *      data: {array},
     *      hasMore: {bool}
     *    }
     */
    getMoreDataFunc: _propTypes2.default.func.isRequired,
    /**
     * 下拉刷新数据
     *
     * @return {Promise} array
     *    [data]
     */
    getRefreshDataFunc: _propTypes2.default.func,
    /**
     * 是否瀑布流(加载更多)
     */
    isLoadMore: _propTypes2.default.bool,
    /**
     * 是否下拉刷新
     */
    isRefresh: _propTypes2.default.bool,
    /**
     * 滚动事件
     */
    onScroll: _propTypes2.default.func,
    /**
     * 没有更多的时候，底部显示文字
     */
    noMoreText: _propTypes2.default.string
}, _class.defaultProps = {
    id: '',
    className: '',
    getRefreshDataFunc: function getRefreshDataFunc() {},
    isLoadMore: false,
    isRefresh: false,
    onScroll: function onScroll() {},
    noMoreText: '抱歉，没有更多商品啦~'
}, _temp);
exports.default = ListViewComponent;

/**
 * 主动刷新 并且清空之前数据
 * 用于条件发生变化
 *
 * @param promiseFunc
 */

var activeRefresh = exports.activeRefresh = function activeRefresh(promiseFunc) {
    emitter.emit('listen', promiseFunc);
};
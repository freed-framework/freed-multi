'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchBarContentLayout = undefined;

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _css2 = require('antd-mobile/lib/search-bar/style/css');

var _searchBar = require('antd-mobile/lib/search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

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
                    * @file searchNavBar.js
                    * @author lihuanji
                    *
                    * 带搜索导航栏
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _native = require('../../native');

var _native2 = _interopRequireDefault(_native);

var _back = require('./back.svg');

var _back2 = _interopRequireDefault(_back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 内容容器
 * @param props
 * @constructor
 */
var SearchBarContentLayout = exports.SearchBarContentLayout = function SearchBarContentLayout(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('ym-search-bar-content-layout', props.className) },
        props.children
    );
};

SearchBarContentLayout.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node.isRequired
};

SearchBarContentLayout.defaultProps = {
    className: ''
};

var SearchNavBar = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(SearchNavBar, _PureComponent);

    function SearchNavBar(props) {
        (0, _classCallCheck3.default)(this, SearchNavBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchNavBar.__proto__ || (0, _getPrototypeOf2.default)(SearchNavBar)).call(this, props));

        _this.state = {
            value: props.defaultValue
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(SearchNavBar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.defaultValue !== nextProps.defaultValue && this.props.isChangeDefaultValue) {
                this.setState({
                    value: nextProps.defaultValue
                });
            }
        }

        /**
         *  变化输入框值
         *
         * @param value
         */

    }, {
        key: 'onChange',
        value: function onChange(value) {
            this.setState({ value: value });
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.setState({
                value: ''
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.state.value;
            var _props = this.props,
                className = _props.className,
                _onSubmit = _props.onSubmit,
                _onClear = _props.onClear,
                onFocus = _props.onFocus,
                onBlur = _props.onBlur,
                placeholder = _props.placeholder;


            return _react2.default.createElement(
                _navBar2.default,
                {
                    className: (0, _classnames2.default)('search-nav-bar', className),
                    onLeftClick: function onLeftClick() {
                        return _native2.default.goBack();
                    },
                    iconName: _back2.default
                },
                _react2.default.createElement(_searchBar2.default, {
                    value: value,
                    placeholder: placeholder,
                    onSubmit: function onSubmit(v) {
                        return _onSubmit(v);
                    },
                    onClear: function onClear(v) {
                        return _onClear(v);
                    },
                    onFocus: onFocus,
                    onBlur: onBlur,
                    onCancel: function onCancel(v) {
                        return _onSubmit(v);
                    },
                    showCancelButton: true,
                    cancelText: '\u641C\u7D22',
                    onChange: this.onChange,
                    autoFocus: true
                })
            );
        }
    }]);
    return SearchNavBar;
}(_react.PureComponent), _class.propTypes = {
    /**
     * class
     */
    className: _propTypes2.default.string,
    /**
     *  默认显示搜索值
     */
    defaultValue: _propTypes2.default.string,
    /**
     * placeholder
     */
    placeholder: _propTypes2.default.string,
    /**
     * 点击搜索
     */
    onSubmit: _propTypes2.default.func,
    /**
     * 点击清除
     */
    onClear: _propTypes2.default.func,
    /**
     * 获取焦点
     */
    onFocus: _propTypes2.default.func,
    /**
     * 失去焦点
     */
    onBlur: _propTypes2.default.func,
    /**
     * 是否需要重新传入defaultValue 改变当前值
     */
    isChangeDefaultValue: _propTypes2.default.bool
}, _class.defaultProps = {
    className: '',
    defaultValue: '',
    placeholder: '请输入商品或关键字',
    onSubmit: function onSubmit() {},
    onClear: function onClear() {},
    onFocus: function onFocus() {},
    onBlur: function onBlur() {},
    isChangeDefaultValue: false
}, _temp);
exports.default = SearchNavBar;
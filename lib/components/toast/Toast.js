'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
                    * @file Toast.js
                    * @author lihuanji
                    *
                    *  toast组件
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _toastSuccess = require('./svg/toastSuccess.svg');

var _toastSuccess2 = _interopRequireDefault(_toastSuccess);

var _toastFail = require('./svg/toastFail.svg');

var _toastFail2 = _interopRequireDefault(_toastFail);

var _toastOffline = require('./svg/toastOffline.svg');

var _toastOffline2 = _interopRequireDefault(_toastOffline);

var _toastLoading = require('./svg/toastLoading.svg');

var _toastLoading2 = _interopRequireDefault(_toastLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建存放toast容器
var node = document.createElement('div');
node.className = 'multi-toast-container';

var Toast = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Toast, _React$Component);

    function Toast(props) {
        (0, _classCallCheck3.default)(this, Toast);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call(this, props));

        _this.timer = null;
        return _this;
    }

    (0, _createClass3.default)(Toast, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                duration = _props.duration,
                onClose = _props.onClose;
            // 如果传入时间为0 则不自动关闭toast

            if (duration !== 0) {
                this.timer = setTimeout(function () {
                    _reactDom2.default.unmountComponentAtNode(node);
                    onClose();
                    node.remove();
                }, duration * 1000);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // 卸载组件时清除timeout
            clearTimeout(this.timer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                content = _props2.content,
                mask = _props2.mask,
                type = _props2.type;


            var iconType = {
                info: false,
                success: _toastSuccess2.default,
                fail: _toastFail2.default,
                offline: _toastOffline2.default,
                loading: _toastLoading2.default
            }[type];

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('multi-toast', { 'multi-toast-mask': mask }) },
                _react2.default.createElement(
                    _reactAddonsCssTransitionGroup2.default,
                    {
                        transitionName: 'multi-toast-animation',
                        transitionAppear: true,
                        transitionAppearTimeout: 200,
                        transitionLeaveTimeout: 0,
                        transitionEnterTimeout: 0
                    },
                    _react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('multi-toast-layer', { 'storey': iconType }) },
                        iconType && _react2.default.createElement(
                            'span',
                            { className: 'multi-toast-icon' },
                            _react2.default.createElement(_icon2.default, { type: iconType, size: 'lg' })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'multi-toast-text' },
                            content
                        )
                    )
                )
            );
        }
    }]);
    return Toast;
}(_react2.default.Component), _class.propTypes = {
    /**
     * toast内容
     */
    content: _propTypes2.default.string.isRequired,
    /**
     * 显示时间
     */
    duration: _propTypes2.default.number,
    /**
     * 关闭后回调
     */
    onClose: _propTypes2.default.func,
    /**
     * 是否显示蒙层
     */
    mask: _propTypes2.default.bool,
    /**
     * 显示类型
     */
    type: _propTypes2.default.oneOf(['success', 'fail', 'info', 'loading', 'offline'])
}, _class.defaultProps = {
    duration: 3,
    onClose: function onClose() {},
    mask: true
}, _temp);

/**
 * 渲染toast方法
 *
 * @param {string} content 显示内容
 * @param {number} duration 显示时间 默认3秒
 * @param {function} onClose 自动关闭后回调,如果duration为0,则此回调无用
 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
 * @param {string} type 显示类型 {success fail info loading offline}
 */

var renderToast = function renderToast(content) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var onClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'info';

    // 把toast容器添加到body节点，react渲染时的根节点
    document.getElementsByTagName('body')[0].appendChild(node);

    // render到toast容器
    _reactDom2.default.render(_react2.default.createElement(Toast, {
        content: content,
        duration: duration,
        onClose: onClose,
        mask: mask,
        type: type
    }), node);
};

exports.default = {
    success: function success(content, duration, onClose, mask) {
        renderToast(content, duration, onClose, mask, 'success');
    },
    fail: function fail(content, duration, onClose, mask) {
        renderToast(content, duration, onClose, mask, 'fail');
    },
    info: function info(content, duration, onClose, mask) {
        renderToast(content, duration, onClose, mask, 'info');
    },
    loading: function loading(content, duration, onClose, mask) {
        renderToast(content, duration, onClose, mask, 'loading');
    },
    offline: function offline(content, duration, onClose, mask) {
        renderToast(content, duration, onClose, mask, 'offline');
    },
    hide: function hide() {
        _reactDom2.default.unmountComponentAtNode(node);
        node.remove();
    }
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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
                    * @file stepper.jsx
                    * @author lihuanji
                    *
                    * 步进器
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../../index');

var _add = require('./add.svg');

var _add2 = _interopRequireDefault(_add);

var _cut = require('./cut.svg');

var _cut2 = _interopRequireDefault(_cut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stepper = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Stepper, _PureComponent);

    function Stepper(props) {
        (0, _classCallCheck3.default)(this, Stepper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Stepper.__proto__ || (0, _getPrototypeOf2.default)(Stepper)).call(this, props));

        _this.state = {
            num: props.value || 1,
            disableAddButton: props.value === props.max,
            disableCutButton: props.value === props.min
        };

        // 存储高度，用户判读是否需要滑动视图
        _this.scroll = document.documentElement.clientHeight;

        _this.add = _this.add.bind(_this);
        _this.cut = _this.cut.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Stepper, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props !== nextProps) {
                this.setState({
                    num: nextProps.value,
                    disableAddButton: nextProps.value === nextProps.max,
                    disableCutButton: nextProps.value === nextProps.min
                });
            }
        }

        /**
         * 增加数量
         */

    }, {
        key: 'add',
        value: function add() {
            if (this.props.max && this.props.max <= this.state.num) {
                this.setState({
                    disableAddButton: true
                });
                return;
            }

            var value = this.state.num + this.props.step;

            if (!this.props.value) {
                this.setState({
                    num: value,
                    disableAddButton: value === this.props.max,
                    disableCutButton: false
                });
            }

            this.props.onButtonClick(value);
        }

        /**
         * 删除数量
         */

    }, {
        key: 'cut',
        value: function cut() {
            if (this.props.min >= this.state.num) {
                this.setState({
                    disableCutButton: true
                });
                return;
            }

            var value = this.state.num - this.props.step;

            if (!this.props.value) {
                this.setState({
                    num: value,
                    disableAddButton: false,
                    disableCutButton: value === this.props.min
                });
            }

            this.props.onButtonClick(value);
        }

        /**
         * input变化
         *
         * @param {object} e 事件对象
         */

    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var onChange = this.props.onChange;

            var val = e.target.value;

            this.setState({
                num: val
            });

            onChange(val);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            var _this2 = this;

            e.preventDefault();

            // 解决安卓输入页面未上滑
            if (_index.isMobile.android.phone) {
                var interval = setInterval(function () {
                    if (document.documentElement.clientHeight !== _this2.scroll) {
                        _this2.stepperRef.scrollIntoViewIfNeeded();
                        clearInterval(interval);
                    }
                }, 100);
            }

            this.props.onFocus();
        }

        /**
         * input失去焦点
         *
         * @param {object} e 事件对象
         */

    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var _props = this.props,
                onBlur = _props.onBlur,
                max = _props.max,
                min = _props.min;

            var val = parseInt(e.target.value, 10);

            var showValue = val;

            if (val >= max && max) {
                showValue = max;
            }

            if (val < min || !showValue) {
                showValue = min;
            }

            if (!this.props.value) {
                this.setState({
                    num: showValue,
                    disableAddButton: showValue === this.props.max,
                    disableCutButton: showValue === this.props.min
                });
            }

            onBlur(showValue);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                num = _state.num,
                disableAddButton = _state.disableAddButton,
                disableCutButton = _state.disableCutButton;
            var disabled = this.props.disabled;


            return _react2.default.createElement(
                'div',
                { className: 'stepper', ref: function ref(_ref) {
                        _this3.stepperRef = _ref;
                    } },
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('stepper-button', 'stepper-cut', { disable: disableCutButton || disabled }),
                        onClick: !disabled && this.cut
                    },
                    _react2.default.createElement(_icon2.default, {
                        className: 'stepper-icon',
                        type: _cut2.default
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'stepper-put' },
                    _react2.default.createElement('input', {
                        disabled: disabled,
                        onChange: this.handleChange,
                        onBlur: this.handleBlur,
                        onFocus: this.handleFocus,
                        onClick: this.handleFocus,
                        value: num,
                        type: 'number'
                    })
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: (0, _classnames2.default)('stepper-button', 'stepper-add', { disable: disableAddButton || disabled }),
                        onClick: !disabled && this.add
                    },
                    _react2.default.createElement(_icon2.default, {
                        className: 'stepper-icon',
                        type: _add2.default
                    })
                )
            );
        }
    }]);
    return Stepper;
}(_react.PureComponent), _class.propTypes = {
    // 默认显示数量
    value: _propTypes2.default.number,
    // 步进数
    step: _propTypes2.default.number,
    // 最小数
    min: _propTypes2.default.number,
    // 最大数
    max: _propTypes2.default.number,
    // 获取焦点时
    onFocus: _propTypes2.default.func,
    // 数值改变时
    onChange: _propTypes2.default.func,
    // 离开焦点时
    onBlur: _propTypes2.default.func,
    // 增/减 按钮点击时
    onButtonClick: _propTypes2.default.func,
    // 是否禁用
    disabled: _propTypes2.default.bool
}, _class.defaultProps = {
    value: null,
    step: 1,
    min: 1,
    max: null,
    onFocus: function onFocus() {},
    onChange: function onChange() {},
    onBlur: function onBlur() {},
    onButtonClick: function onButtonClick() {},
    disabled: false
}, _temp);
exports.default = Stepper;
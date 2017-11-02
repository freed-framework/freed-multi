'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavBarContentLayout = undefined;

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
                    * @file navBar.js
                    * @author lihuanji
                    *
                    *  导航栏
                    */

exports.setTitle = setTitle;
exports.setTitleHelpClick = setTitleHelpClick;
exports.setLeftButton = setLeftButton;
exports.setRightButton = setRightButton;
exports.setButtonEnable = setButtonEnable;
exports.setCloseButton = setCloseButton;
exports.updateRightButton = updateRightButton;

require('antd-mobile/lib/nav-bar/style/css');

require('antd-mobile/lib/icon/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mitt = require('mitt');

var _mitt2 = _interopRequireDefault(_mitt);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _native = require('../../native');

var _native2 = _interopRequireDefault(_native);

require('./navBar.scss');

var _back = require('../search-nav-bar/back.svg');

var _back2 = _interopRequireDefault(_back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _mitt2.default)();

var NavBarComponent = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(NavBarComponent, _PureComponent);

    function NavBarComponent(props) {
        (0, _classCallCheck3.default)(this, NavBarComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NavBarComponent.__proto__ || (0, _getPrototypeOf2.default)(NavBarComponent)).call(this, props));

        _this.state = {
            title: props.title,
            helpClick: props.helpClick,
            leftButtonTitle: props.leftButtonTitle,
            leftButtonClick: props.leftButtonClick,
            leftDisable: props.leftDisable,
            showClose: props.showClose,
            rightButton: props.rightButton
        };

        _this.handleGoBack = _this.handleGoBack.bind(_this);
        _this.handleClose = _this.handleClose.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(NavBarComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // todo 从原生获取当页是否需要显示关闭按钮
            // this.setState({showClose: true});
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            emitter.on('listen', function (_ref) {
                var type = _ref.type,
                    data = _ref.data;

                switch (type) {
                    case 'setTitle':
                        _this2.setTitle(data);
                        break;
                    case 'setTitleHelpClick':
                        _this2.setTitleHelpClick(data);
                        break;
                    case 'setLeftButton':
                        _this2.setLeftButton(data);
                        break;
                    case 'setButtonEnable':
                        _this2.setButtonEnable(data);
                        break;
                    case 'setRightButton':
                        _this2.setRightButton(data);
                        break;
                    case 'setCloseButton':
                        _this2.setCloseButton(data);
                        break;
                    case 'updateRightButton':
                        _this2.updateRightButton(data);
                        break;
                    default:
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props !== nextProps) {
                this.setState({
                    title: nextProps.title,
                    helpClick: nextProps.helpClick,
                    leftButtonTitle: nextProps.leftButtonTitle,
                    leftButtonClick: nextProps.leftButtonClick,
                    leftDisable: nextProps.leftDisable,
                    showClose: nextProps.showClose,
                    rightButton: nextProps.rightButton
                });
            }
        }

        /**
         *  设置右侧按钮
         *
         * @param {Array} rightBtnArr
         * @param {string || imgPath} 文字或者图片 url
         * @param {Function} 点击按钮的回调
         */

    }, {
        key: 'setRightButton',
        value: function setRightButton(rightBtnArr) {
            this.setState({ rightButton: rightBtnArr });
        }

        /**
         *  设置按钮是否可用
         *
         * @param {string} key left right {KEY}
         * @param {boolean} enable
         */

    }, {
        key: 'setButtonEnable',
        value: function setButtonEnable(_ref2) {
            var key = _ref2.key,
                enable = _ref2.enable;

            if (key !== 'left') {
                this.state.rightButton.forEach(function (v) {
                    if (v.key === key || key === 'right') {
                        var value = v;
                        value.disable = enable;
                    }
                });

                this.forceUpdate();
            } else {
                this.setState({ leftDisable: enable });
            }
        }

        /**
         * 设置标题
         *
         * @param {string} title
         */

    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            this.setState({ title: title });
        }

        /**
         *  设置帮助按钮
         *
         *  @param {Function || null} call 点击帮助按钮回调 {null为不显示帮助按钮}
         */

    }, {
        key: 'setTitleHelpClick',
        value: function setTitleHelpClick(call) {
            this.setState({ helpClick: call });
        }

        /**
         *  设置左侧按钮
         *
         *  @param {string} title 左侧按钮文字
         *  @param {Function} call 点击回调
         */

    }, {
        key: 'setLeftButton',
        value: function setLeftButton(_ref3) {
            var title = _ref3.title,
                call = _ref3.call;

            this.setState({
                leftButtonTitle: title || this.state.leftButtonTitle,
                leftButtonClick: call || this.state.leftButtonClick
            });
        }

        /**
         *  设置关闭按钮是否显示
         *
         * @param {boolean} isShow
         */

    }, {
        key: 'setCloseButton',
        value: function setCloseButton(isShow) {
            this.setState({ showClose: isShow });
        }
    }, {
        key: 'getRightButton',
        value: function getRightButton() {
            var buttonArray = [];

            this.state.rightButton.forEach(function (v, i) {
                // 如果传入svg 为#开头
                if (/^(#)/.test(v.icon) || v.antType) {
                    var icon = _react2.default.createElement(_icon2.default, {
                        key: i,
                        className: v.disable && 'navbar-disable',
                        type: v.antType || v.icon,
                        onClick: !v.disable && v.click
                    });
                    if (v.sup) {
                        icon = _react2.default.createElement(
                            'span',
                            {
                                className: (0, _classnames2.default)('navbar-sup', { 'navbar-disable': v.disable }),
                                onClick: !v.disable && v.click
                            },
                            _react2.default.createElement(_icon2.default, {
                                key: i,
                                type: v.antType || v.icon
                            }),
                            _react2.default.createElement(
                                'sup',
                                { className: 'navbar-sup-text' },
                                v.sup > 99 ? '99+' : v.sup
                            )
                        );
                    }
                    buttonArray.push(icon);
                } else {
                    buttonArray.push(_react2.default.createElement(
                        'span',
                        {
                            key: i,
                            className: v.disable && 'navbar-disable',
                            onClick: !v.disable && v.click
                        },
                        v.icon
                    ));
                }
            });

            return buttonArray;
        }

        /**
         *  点击返回按钮
         */

    }, {
        key: 'handleGoBack',
        value: function handleGoBack() {
            if (!this.state.leftButtonClick()) {
                _native2.default.goBack();
            }
        }

        /**
         *  点击关闭按钮
         */

    }, {
        key: 'handleClose',
        value: function handleClose() {}
        // todo 调用原生快速关闭
        // alert('关闭页面');


        /**
         *  更新右侧按钮
         *
         * @param {string} key  button key值
         * @param {Object} options 需要改变的属性
         */

    }, {
        key: 'updateRightButton',
        value: function updateRightButton(_ref4) {
            var key = _ref4.key,
                options = _ref4.options;

            this.state.rightButton.forEach(function (v) {
                var value = v;

                if (v.key === key) {
                    var k = (0, _keys2.default)(options);

                    k.forEach(function (val) {
                        value[val] = options[val];
                    });
                }
            });

            this.forceUpdate();
        }
    }, {
        key: 'componentWillUnmout',
        value: function componentWillUnmout() {
            emitter.off('listen');
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                title = _state.title,
                helpClick = _state.helpClick,
                leftButtonTitle = _state.leftButtonTitle,
                showClose = _state.showClose,
                leftDisable = _state.leftDisable;
            var className = this.props.className;


            var titleContent = leftButtonTitle;

            if (titleContent === 'none') {
                titleContent = '';
            } else if (!titleContent) {
                titleContent = _react2.default.createElement(
                    'span',
                    { className: 'navbar-left-icon' },
                    _react2.default.createElement(_icon2.default, { type: _back2.default, size: 'xs' })
                );
            }

            return _react2.default.createElement(
                _navBar2.default,
                {
                    className: (0, _classnames2.default)('navbar', className),
                    iconName: null,
                    leftContent: [_react2.default.createElement(
                        'div',
                        {
                            key: 'leftButton',
                            className: 'navbar-left'
                        },
                        _react2.default.createElement(
                            'span',
                            {
                                className: (leftDisable && 'navbar-disable') + ' navbar-left-back',
                                onClick: !leftDisable && leftButtonTitle !== 'none' && this.handleGoBack
                            },
                            titleContent
                        ),
                        showClose && _react2.default.createElement(
                            'span',
                            {
                                className: 'navbar-left-close',
                                onClick: this.handleClose
                            },
                            '\u5173\u95ED'
                        )
                    )],
                    rightContent: _react2.default.createElement(
                        'span',
                        { className: 'navbar-right' },
                        [this.getRightButton()]
                    )
                },
                _react2.default.createElement(
                    'span',
                    { className: 'navbar-title' },
                    title
                ),
                helpClick && _react2.default.createElement(
                    'span',
                    {
                        className: 'navbar-title-question',
                        onClick: helpClick
                    },
                    _react2.default.createElement(_icon2.default, { type: 'question-circle' })
                )
            );
        }
    }]);
    return NavBarComponent;
}(_react.PureComponent), _class.propTypes = {
    className: _propTypes2.default.string,
    /**
     * 页面标题
     */
    title: _propTypes2.default.string,
    /**
     * 左侧按钮文字
     */
    leftButtonTitle: _propTypes2.default.string,
    /**
     * 返回按钮点击前回调
     */
    leftButtonClick: _propTypes2.default.func,
    /**
     * 返回按钮禁用状态
     */
    leftDisable: _propTypes2.default.bool,
    /**
     * 右侧按钮
     */
    rightButton: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        icon: _propTypes2.default.string, // icon图标或文字 icon图标 import SVG 和ant icon组件使用方法一致
        antType: _propTypes2.default.string, // ant提供的icon 传入type
        click: _propTypes2.default.func, // 点击函数
        disable: _propTypes2.default.bool, // 是否禁用
        sup: _propTypes2.default.number, // 显示icon右上角数字
        key: _propTypes2.default.string // 用于修改, 根据key更改button
    })),
    /**
     * 帮助按钮点击
     */
    helpClick: _propTypes2.default.func,
    /**
     * 关闭按钮是否显示
     */
    showClose: _propTypes2.default.bool
}, _class.defaultProps = {
    className: '',
    title: '',
    leftButtonTitle: null,
    leftButtonClick: function leftButtonClick() {
        return false;
    },
    leftDisable: false,
    showClose: false,
    helpClick: null,
    rightButton: []
}, _temp);
exports.default = NavBarComponent;

/**
 * 内容容器
 * @param props
 * @constructor
 */

var NavBarContentLayout = exports.NavBarContentLayout = function NavBarContentLayout(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('ym-nav-bar-content-layout', props.className) },
        props.children
    );
};

NavBarContentLayout.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node.isRequired
};

NavBarContentLayout.defaultProps = {
    className: ''
};

/**
 * 设置导航栏标题
 *
 * @param {string} title
 */
function setTitle(title) {
    emitter.emit('listen', {
        type: 'setTitle',
        data: title
    });
}

/**
 * 设置帮助按钮
 *
 * @param {Function || null} call 点击帮助按钮回调 {null为不显示帮助按钮}
 */
function setTitleHelpClick(call) {
    emitter.emit('listen', {
        type: 'setTitleHelpClick',
        data: call
    });
}

/**
 * 设置左侧按钮
 *
 * @param {string} title 左侧按钮文字
 * @param {Function} call 点击回调 {return false 不执行goBack}
 */
function setLeftButton(title, call) {
    emitter.emit('listen', {
        type: 'setLeftButton',
        data: {
            title: title,
            call: call
        }
    });
}

/**
 *  设置右侧按钮
 *
 * @param {Array} rightBtnArr
 * @param {string || imgPath} 文字或者图片 url
 * @param {Function} 点击按钮的回调
 */
function setRightButton(rightBtnArr) {
    emitter.emit('listen', {
        type: 'setRightButton',
        data: rightBtnArr
    });
}

/**
 *  设置按钮是否可用
 *
 * @param {string} key left right {KEY}
 * @param {boolean} enable
 */
function setButtonEnable(key, enable) {
    emitter.emit('listen', {
        type: 'setButtonEnable',
        data: {
            key: key,
            enable: enable
        }
    });
}

/**
 *  设置关闭按钮是否显示
 *
 * @param {boolean} isShow
 */
function setCloseButton(isShow) {
    emitter.emit('listen', {
        type: 'setCloseButton',
        data: isShow
    });
}

/**
 *  更新右侧按钮
 *
 * @param {string} key  button key值
 * @param {Object} options 需要改变的属性
 */
function updateRightButton(key, options) {
    emitter.emit('listen', {
        type: 'updateRightButton',
        data: {
            key: key,
            options: options
        }
    });
}
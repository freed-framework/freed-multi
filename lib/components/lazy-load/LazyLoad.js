'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _seat = require('./seat.svg');

var _seat2 = _interopRequireDefault(_seat);

require('./lazyLoad.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file LazyLoad.js
 * @author lihuanji
 *
 * 图片懒加载
 *
 * 基于react-lazyload封装，https://github.com/jasonslyvia/react-lazyload
 *
 * 滑动容器css overflow: scroll;
 */
var LazyLoadComponent = function LazyLoadComponent(props) {
    var children = props.children;


    return _react2.default.createElement(
        _reactLazyload2.default,
        (0, _extends3.default)({
            placeholder: _react2.default.createElement(_icon2.default, {
                type: _seat2.default,
                style: {
                    height: '100%',
                    width: '100%'
                }
            }),
            once: true,
            throttle: 200
        }, props),
        _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
                component: 'div',
                className: 'imgWarp',
                transitionName: 'fade',
                transitionAppear: true,
                transitionAppearTimeout: 500,
                transitionEnter: false,
                transitionLeave: false
            },
            children
        )
    );
};

LazyLoadComponent.propTypes = {
    /**
     * 需要懒加载的节点
     */
    children: _propTypes2.default.element.isRequired
};

exports.default = LazyLoadComponent;
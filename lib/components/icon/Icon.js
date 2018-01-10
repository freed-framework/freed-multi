'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(props) {
    var _classnames;

    var type = props.type,
        className = props.className,
        style = props.style,
        _props$size = props.size,
        size = _props$size === undefined ? 'md' : _props$size;


    var typeIcon = type.substr(1);

    var iconClassName = (0, _classnames3.default)((_classnames = {
        'multi-icon': true
    }, (0, _defineProperty3.default)(_classnames, 'multi-icon-' + typeIcon, true), (0, _defineProperty3.default)(_classnames, 'multi-icon-' + size, true), (0, _defineProperty3.default)(_classnames, className, !!className), _classnames));

    return _react2.default.createElement(
        'svg',
        { className: iconClassName, style: style },
        _react2.default.createElement('use', { xlinkHref: '' + type })
    );
}; /**
    * @file Icon.jsx
    * @author lihuanji
    *
    * icon图标组件
    */

Icon.propTypes = {
    /**
     * classname
     */
    className: _propTypes2.default.string,
    /**
     * style
     */
    style: _propTypes2.default.objectOf(_propTypes2.default.string),
    /**
     * require 资源 SVG
     */
    type: _propTypes2.default.string.isRequired,
    /**
     * 图标大小 'xxs'/'xs'/'sm'/'md'/'lg'
     */
    size: _propTypes2.default.oneOf(['xxs', 'xs', 'sm', 'md', 'lg'])
};

Icon.defaultProps = {
    className: null,
    style: {},
    size: 'md'
};

exports.default = Icon;
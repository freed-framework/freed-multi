'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedLayout = function FixedLayout(props) {
    return _react2.default.createElement(
        'div',
        { className: 'fixed-layout' },
        _react2.default.createElement(
            'div',
            { className: 'fixed-layout-main' },
            props.content
        ),
        _react2.default.createElement(
            'div',
            { className: 'fixed-layout-fixer' },
            props.fixer
        )
    );
}; /**
    * @file index.js
    * @author denglingbo
    *
    */


FixedLayout.propTypes = {
    content: _propTypes2.default.node,
    fixer: _propTypes2.default.node
};

FixedLayout.defaultProps = {
    content: null,
    fixer: null
};

exports.default = FixedLayout;
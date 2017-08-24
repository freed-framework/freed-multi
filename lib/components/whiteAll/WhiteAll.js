'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./whiteAll.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhiteAll = function WhiteAll(props) {
    return _react2.default.createElement(
        'div',
        { className: 'ym-white-all ' + props.className },
        props.children
    );
}; /**
    * @file WhiteAll.jsx
    * @author denglingbo
    *
    * Des
    */


WhiteAll.propTypes = {
    children: _propTypes2.default.node.isRequired,
    className: _propTypes2.default.string
};

WhiteAll.defaultProps = {
    className: ''
};

exports.default = WhiteAll;
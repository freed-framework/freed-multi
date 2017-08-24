'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./boxer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Boxer = function Boxer(props) {
    return _react2.default.createElement(
        'div',
        { className: 'ym-boxer ' + props.className },
        _react2.default.createElement(
            'div',
            { className: 'ym-boxer-title' },
            props.title
        ),
        _react2.default.createElement(
            'div',
            { className: 'ym-boxer-content' },
            props.children
        )
    );
}; /**
    * @file Boxer.jsx
    * @author denglingbo
    *
    * Des
    */


Boxer.propTypes = {
    title: _propTypes2.default.string,
    className: _propTypes2.default.string,
    children: _propTypes2.default.node.isRequired
};

Boxer.defaultProps = {
    title: '',
    className: ''
};

exports.default = Boxer;
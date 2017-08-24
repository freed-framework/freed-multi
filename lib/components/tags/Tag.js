'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./tag.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(props) {
    var text = props.text,
        onClick = props.onClick;


    return _react2.default.createElement(
        'div',
        {
            className: 'yt-tag',
            onClick: onClick
        },
        text
    );
}; /**
    * @file Tag
    * @author denglingbo
    *
    * Des
    */


Tag.propTypes = {
    text: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};

Tag.defaultProps = {
    text: '',
    onClick: function onClick() {}
};

exports.default = Tag;
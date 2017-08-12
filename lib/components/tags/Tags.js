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
                    * @file Tags.js
                    * @author denglingbo
                    *
                    * Des
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

require('./tags.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tags = (_temp = _class = function (_PureComponent) {
    (0, _inherits3.default)(Tags, _PureComponent);

    function Tags() {
        (0, _classCallCheck3.default)(this, Tags);
        return (0, _possibleConstructorReturn3.default)(this, (Tags.__proto__ || (0, _getPrototypeOf2.default)(Tags)).apply(this, arguments));
    }

    (0, _createClass3.default)(Tags, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'yt-tags' },
                this.props.children
            );
        }
    }]);
    return Tags;
}(_react.PureComponent), _class.Tag = _Tag2.default, _temp);


Tags.propTypes = {
    children: _propTypes2.default.node.isRequired
};

exports.default = Tags;
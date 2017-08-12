/**
 * @file WhiteAll.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import PropTypes from 'prop-types';
import './whiteAll.scss';

const WhiteAll = (props) => (
    <div className={`ym-white-all ${props.className}`}>
        {props.children}
    </div>
)

WhiteAll.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

WhiteAll.defaultProps = {
    className: '',
}

export default WhiteAll;

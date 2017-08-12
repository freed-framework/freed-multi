/**
 * @file Boxer.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import PropTypes from 'prop-types';
import './boxer.scss';

const Boxer = (props) => (
    <div className={`ym-boxer ${props.className}`}>
        <div className="ym-boxer-title">
            {props.title}
        </div>
        <div className="ym-boxer-content">
            {props.children}
        </div>
    </div>
)

Boxer.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

Boxer.defaultProps = {
    title: '',
    className: '',
}

export default Boxer;

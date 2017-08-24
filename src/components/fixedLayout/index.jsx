/**
 * @file index.js
 * @author denglingbo
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const FixedLayout = (props) => (
    <div className="fixed-layout">
        <div className="fixed-layout-main">
            {props.content}
        </div>
        <div className="fixed-layout-fixer">
            {props.fixer}
        </div>
    </div>
);

FixedLayout.propTypes = {
    content: PropTypes.node,
    fixer: PropTypes.node,
}

FixedLayout.defaultProps = {
    content: null,
    fixer: null,
}

export default FixedLayout;

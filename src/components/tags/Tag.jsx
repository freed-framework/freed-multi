/**
 * @file Tag
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import PropTypes from 'prop-types';
import './tag.scss';

const Tag = (props) => {
    const { text, onClick } = props;

    return (
        <div
            className="yt-tag"
            onClick={onClick}
        >
            {text}
        </div>
    )
}

Tag.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

Tag.defaultProps = {
    text: '',
    onClick: () => {}
}

export default Tag;

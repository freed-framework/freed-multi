/**
 * @file Icon.jsx
 * @author lihuanji
 *
 * icon图标组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Icon = (props) => {
    const { type, className, style, size = 'md' } = props;

    const typeIcon = type.substr(1);

    const iconClassName = classnames({
        'multi-icon': true,
        [`multi-icon-${typeIcon}`]: true,
        [`multi-icon-${size}`]: true,
        [className]: !!className
    });

    return (
        <svg className={iconClassName} style={style}>
            <use xlinkHref={`${type}`} />
        </svg>
    );
};

Icon.propTypes = {
    /**
     * classname
     */
    className: PropTypes.string,
    /**
     * style
     */
    style: PropTypes.objectOf(PropTypes.string),
    /**
     * require 资源 SVG
     */
    type: PropTypes.string.isRequired,
    /**
     * 图标大小 'xxs'/'xs'/'sm'/'md'/'lg'
     */
    size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg']),
};

Icon.defaultProps = {
    className: null,
    style: {},
    size: 'md'
};

export default Icon;

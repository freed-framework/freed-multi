/**
 * @file Tags.js
 * @author denglingbo
 *
 * Des
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import './tags.scss';

class Tags extends PureComponent {
    static Tag = Tag;

    render() {
        return (
            <div className="yt-tags">
                {this.props.children}
            </div>
        )
    }
}

Tags.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Tags;

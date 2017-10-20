import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import './Item.less';

const Item = React.createClass({
    PropTypes: {
        logo: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        onClick: PropTypes.func,
    },
    getDefaultProps() {
        return {
            logo: '',
            title: '',
            subtitle: '',
            onClick: () => {
            },
        };
    },
    handleTouchStart() {
        this.refs.demoitem.style.backgroundColor = '#f2f2f2';
    },
    handleTouchEnd() {
        this.refs.demoitem.style.backgroundColor = '#fff';
    },
    render() {
        const {logo, title, subtitle, linkTo, style} = this.props;
        return (
            <section
                className="am-demo-item"
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchEnd}
                ref="demoitem"
                style={style}
            >
                <div className="am-demo-item-inner">
                    <Link to={linkTo}>
                        <div className="am-demo-item-logo" style={{backgroundImage: `url(${logo})`}}/>
                        <h1 className="am-demo-item-title">{title}</h1>
                        <h2 className="am-demo-item-subtitle">{subtitle}</h2>
                    </Link>
                </div>
            </section>
        );
    },
});

export default Item;

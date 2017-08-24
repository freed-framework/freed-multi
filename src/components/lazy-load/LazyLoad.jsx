/**
 * @file LazyLoad.js
 * @author lihuanji
 *
 * 图片懒加载
 *
 * 基于react-lazyload封装，https://github.com/jasonslyvia/react-lazyload
 *
 * 滑动容器css overflow: scroll;
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import seat from './seat.svg';
import './lazyLoad.scss';

const LazyLoadComponent = (props) => {
    const { children } = props;

    return (
        <LazyLoad
            placeholder={
                <Icon
                    type={seat}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                />
            }
            once
            throttle={200}
            {...props}
        >
            <ReactCSSTransitionGroup
                component="div"
                className="imgWarp"
                transitionName="fade"
                transitionAppear
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                { children }
            </ReactCSSTransitionGroup>
        </LazyLoad>
    )
};

LazyLoadComponent.propTypes = {
    /**
     * 需要懒加载的节点
     */
    children: PropTypes.element.isRequired
};

export default LazyLoadComponent;

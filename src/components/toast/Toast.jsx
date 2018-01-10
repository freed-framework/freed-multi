/**
 * @file Toast.js
 * @author lihuanji
 *
 *  toast组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from '../icon';

import toastSuccess from './svg/toastSuccess.svg';
import toastFail from './svg/toastFail.svg';
import toastOffline from './svg/toastOffline.svg';
import toastLoading from './svg/toastLoading.svg';

// 创建存放toast容器
const node = document.createElement('div');
node.className = 'multi-toast-container';

class Toast extends React.Component {
    static propTypes = {
        /**
         * toast内容
         */
        content: PropTypes.string.isRequired,
        /**
         * 显示时间
         */
        duration: PropTypes.number,
        /**
         * 关闭后回调
         */
        onClose: PropTypes.func,
        /**
         * 是否显示蒙层
         */
        mask: PropTypes.bool,
        /**
         * 显示类型
         */
        type: PropTypes.oneOf(['success', 'fail', 'info', 'loading', 'offline'])
    };

    static defaultProps = {
        duration: 3,
        onClose: () => {},
        mask: true,
        type: 'info'
    };

    constructor(props) {
        super(props);

        this.timer = null;
    }

    componentDidMount() {
        const { duration, onClose } = this.props;
        // 如果传入时间为0 则不自动关闭toast
        if (duration !== 0) {
            this.timer = setTimeout(() => {
                ReactDOM.unmountComponentAtNode(node);
                onClose();
                node.remove();
            }, duration * 1000);
        }
    }

    componentWillUnmount() {
        // 卸载组件时清除timeout
        clearTimeout(this.timer);
    }

    render() {
        const { content, mask, type } = this.props;

        const iconType = ({
            info: false,
            success: toastSuccess,
            fail: toastFail,
            offline: toastOffline,
            loading: toastLoading,
        })[type];

        return (
            <div className={classnames('multi-toast', {'multi-toast-mask': mask})}>
                <ReactCSSTransitionGroup
                    transitionName="multi-toast-animation"
                    transitionAppear
                    transitionAppearTimeout={200}
                    transitionLeaveTimeout={0}
                    transitionEnterTimeout={0}
                >
                    <div className={classnames('multi-toast-layer', {storey: iconType})}>
                        {
                            iconType &&
                            <span className="multi-toast-icon">
                                <Icon type={iconType} size="lg" />
                            </span>
                        }
                        <span className="multi-toast-text">{content}</span>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

/**
 * 渲染toast方法
 *
 * @param {string} content 显示内容
 * @param {number} duration 显示时间 默认3秒
 * @param {function} onClose 自动关闭后回调,如果duration为0,则此回调无用
 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
 * @param {string} type 显示类型 {success fail info loading offline}
 */
const renderToast = (content, duration = 3, onClose = () => {}, mask = true, type = 'info') => {
    // 把toast容器添加到body节点，react渲染时的根节点
    document.getElementsByTagName('body')[0].appendChild(node);

    // render到toast容器
    ReactDOM.render(
        <Toast
            content={content}
            duration={duration}
            onClose={onClose}
            mask={mask}
            type={type}
        />,
        node
    );
};

export default {
    success: (content, duration, onClose, mask) => {
        renderToast(content, duration, onClose, mask, 'success')
    },
    fail: (content, duration, onClose, mask) => {
        renderToast(content, duration, onClose, mask, 'fail')
    },
    info: (content, duration, onClose, mask) => {
        renderToast(content, duration, onClose, mask, 'info');
    },
    loading: (content, duration, onClose, mask) => {
        renderToast(content, duration, onClose, mask, 'loading');
    },
    offline: (content, duration, onClose, mask) => {
        renderToast(content, duration, onClose, mask, 'offline');
    },
    hide() {
        ReactDOM.unmountComponentAtNode(node);
        node.remove();
    }
};

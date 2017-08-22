/**
 * @file navBar.js
 * @author lihuanji
 *
 *  导航栏
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import mitt from 'mitt';
import classnames from 'classnames';
import Native from '../../native';
import './navBar.scss';
import back from '../search-nav-bar/back.svg';

const emitter = mitt();

class NavBarComponent extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        /**
         * 页面标题
         */
        title: PropTypes.string,
        /**
         * 左侧按钮文字
         */
        leftButtonTitle: PropTypes.string,
        /**
         * 返回按钮点击前回调
         */
        leftButtonClick: PropTypes.func,
        /**
         * 返回按钮禁用状态
         */
        leftDisable: PropTypes.bool,
        /**
         * 右侧按钮
         */
        rightButton: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string, // icon图标或文字 icon图标 import SVG 和ant icon组件使用方法一致
            antType: PropTypes.string, // ant提供的icon 传入type
            click: PropTypes.func, // 点击函数
            disable: PropTypes.bool, // 是否禁用
            sup: PropTypes.number, // 显示icon右上角数字
            key: PropTypes.string, // 用于修改, 根据key更改button
        })),
        /**
         * 帮助按钮点击
         */
        helpClick: PropTypes.func,
        /**
         * 关闭按钮是否显示
         */
        showClose: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        title: '',
        leftButtonTitle: null,
        leftButtonClick: () => (false),
        leftDisable: false,
        showClose: false,
        helpClick: null,
        rightButton: []
    };

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            helpClick: props.helpClick,
            leftButtonTitle: props.leftButtonTitle,
            leftButtonClick: props.leftButtonClick,
            leftDisable: props.leftDisable,
            showClose: props.showClose,
            rightButton: props.rightButton,
        };

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        // todo 从原生获取当页是否需要显示关闭按钮
        // this.setState({showClose: true});
    }

    componentDidMount() {
        emitter.on('listen', ({type, data}) => {
            switch (type) {
                case 'setTitle':
                    this.setTitle(data);
                    break;
                case 'setTitleHelpClick':
                    this.setTitleHelpClick(data);
                    break;
                case 'setLeftButton':
                    this.setLeftButton(data);
                    break;
                case 'setButtonEnable':
                    this.setButtonEnable(data);
                    break;
                case 'setRightButton':
                    this.setRightButton(data);
                    break;
                case 'setCloseButton':
                    this.setCloseButton(data);
                    break;
                case 'updateRightButton':
                    this.updateRightButton(data);
                    break;
                default:
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                title: nextProps.title,
                helpClick: nextProps.helpClick,
                leftButtonTitle: nextProps.leftButtonTitle,
                leftButtonClick: nextProps.leftButtonClick,
                leftDisable: nextProps.leftDisable,
                showClose: nextProps.showClose,
                rightButton: nextProps.rightButton,
            })
        }
    }

    /**
     *  设置右侧按钮
     *
     * @param {Array} rightBtnArr
     * @param {string || imgPath} 文字或者图片 url
     * @param {Function} 点击按钮的回调
     */
    setRightButton(rightBtnArr) {
        this.setState({rightButton: rightBtnArr});
    }

    /**
     *  设置按钮是否可用
     *
     * @param {string} key left right {KEY}
     * @param {boolean} enable
     */
    setButtonEnable({key, enable}) {
        if (key !== 'left') {
            this.state.rightButton.forEach((v) => {
                if (v.key === key || key === 'right') {
                    const value = v;
                    value.disable = enable;
                }
            });

            this.forceUpdate();
        } else {
            this.setState({leftDisable: enable});
        }
    }

    /**
     * 设置标题
     *
     * @param {string} title
     */
    setTitle(title) {
        this.setState({title});
    }

    /**
     *  设置帮助按钮
     *
     *  @param {Function || null} call 点击帮助按钮回调 {null为不显示帮助按钮}
     */
    setTitleHelpClick(call) {
        this.setState({helpClick: call});
    }

    /**
     *  设置左侧按钮
     *
     *  @param {string} title 左侧按钮文字
     *  @param {Function} call 点击回调
     */
    setLeftButton({title, call}) {
        this.setState({
            leftButtonTitle: title || this.state.leftButtonTitle,
            leftButtonClick: call || this.state.leftButtonClick
        })
    }

    /**
     *  设置关闭按钮是否显示
     *
     * @param {boolean} isShow
     */
    setCloseButton(isShow) {
        this.setState({showClose: isShow});
    }

    getRightButton() {
        const buttonArray = [];

        this.state.rightButton.forEach((v, i) => {
            // 如果传入svg 为#开头
            if (/^(#)/.test(v.icon) || v.antType) {
                let icon = (<Icon
                    key={i}
                    className={v.disable && 'container-disable'}
                    type={v.antType || v.icon}
                    onClick={!v.disable && v.click}
                />);
                if (v.sup) {
                    icon = (
                        <span
                            className={classnames('container-sup', {'container-disable': v.disable})}
                            onClick={!v.disable && v.click}
                        >
                            <Icon
                                key={i}
                                type={v.antType || v.icon}
                            />
                            <sup className="container-sup-text">{v.sup > 99 ? '99+' : v.sup}</sup>
                        </span>
                    );
                }
                buttonArray.push(icon);
            } else {
                buttonArray.push(
                    <span
                        key={i}
                        className={v.disable && 'container-disable'}
                        onClick={!v.disable && v.click}
                    >
                        {v.icon}
                    </span>
                )
            }
        });

        return buttonArray;
    }

    /**
     *  点击返回按钮
     */
    handleGoBack() {
        if (!this.state.leftButtonClick()) {
            Native.goBack();
        }
    }

    /**
     *  点击关闭按钮
     */
    handleClose() {
        // todo 调用原生快速关闭
        // alert('关闭页面');
    }

    /**
     *  更新右侧按钮
     *
     * @param {string} key  button key值
     * @param {Object} options 需要改变的属性
     */
    updateRightButton({key, options}) {
        this.state.rightButton.forEach((v) => {
            const value = v;

            if (v.key === key) {
                const k = Object.keys(options);

                k.forEach((val) => {
                    value[val] = options[val];
                });
            }
        });

        this.forceUpdate();
    }

    componentWillUnmout() {
        emitter.off('listen');
    }

    render() {
        const { title, helpClick, leftButtonTitle, showClose, leftDisable } = this.state;
        const { className } = this.props;

        let titleContent = leftButtonTitle;

        if (titleContent === 'none') {
            titleContent = '';
        } else if (!titleContent) {
            titleContent = <span className="container-left-icon"><Icon type={back} size="xs" /></span>;
        }

        return (
            <NavBar
                className={classnames('container', className)}
                iconName={null}
                leftContent={[
                    <div
                        key="leftButton"
                        className="container-left"
                    >
                        <span
                            className={`${leftDisable && 'container-disable'} container-left-back`}
                            onClick={!leftDisable && this.handleGoBack}
                        >
                            {titleContent}
                        </span>
                        {
                            showClose &&
                            <span
                                className="container-left-close"
                                onClick={this.handleClose}
                            >
                                    关闭
                            </span>
                        }

                    </div>
                ]}
                rightContent={
                    <span className="container-right">
                        {[
                            this.getRightButton()
                        ]}
                    </span>
                }
            >
                <span className="container-title">{title}</span>
                {
                    helpClick &&
                    <span
                        className="container-title-question"
                        onClick={helpClick}
                    >
                        <Icon type="question-circle" />
                    </span>
                }
            </NavBar>
        );
    }
}

export default NavBarComponent;


/**
 * 内容容器
 * @param props
 * @constructor
 */
export const NavBarContentLayout = (props) => (
    <div className="ym-nav-bar-content-layout">
        {props.children}
    </div>
);

NavBarContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * 设置导航栏标题
 *
 * @param {string} title
 */
export function setTitle(title) {
    emitter.emit('listen', {
        type: 'setTitle',
        data: title
    });
}

/**
 * 设置帮助按钮
 *
 * @param {Function || null} call 点击帮助按钮回调 {null为不显示帮助按钮}
 */
export function setTitleHelpClick(call) {
    emitter.emit('listen', {
        type: 'setTitleHelpClick',
        data: call
    });
}

/**
 * 设置左侧按钮
 *
 * @param {string} title 左侧按钮文字
 * @param {Function} call 点击回调 {return false 不执行goBack}
 */
export function setLeftButton(title, call) {
    emitter.emit('listen', {
        type: 'setLeftButton',
        data: {
            title,
            call
        }
    });
}

/**
 *  设置右侧按钮
 *
 * @param {Array} rightBtnArr
 * @param {string || imgPath} 文字或者图片 url
 * @param {Function} 点击按钮的回调
 */
export function setRightButton(rightBtnArr) {
    emitter.emit('listen', {
        type: 'setRightButton',
        data: rightBtnArr
    });
}

/**
 *  设置按钮是否可用
 *
 * @param {string} key left right {KEY}
 * @param {boolean} enable
 */
export function setButtonEnable(key, enable) {
    emitter.emit('listen', {
        type: 'setButtonEnable',
        data: {
            key,
            enable
        }
    });
}

/**
 *  设置关闭按钮是否显示
 *
 * @param {boolean} isShow
 */
export function setCloseButton(isShow) {
    emitter.emit('listen', {
        type: 'setCloseButton',
        data: isShow
    });
}

/**
 *  更新右侧按钮
 *
 * @param {string} key  button key值
 * @param {Object} options 需要改变的属性
 */
export function updateRightButton(key, options) {
    emitter.emit('listen', {
        type: 'updateRightButton',
        data: {
            key,
            options
        }
    });
}

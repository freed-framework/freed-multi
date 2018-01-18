/**
 * @file stepper.jsx
 * @author lihuanji
 *
 * 步进器
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import classnames from 'classnames';
import { isMobile } from '../../index';

import addIcon from './add.svg';
import cutIcon from './cut.svg';

class Stepper extends PureComponent {
    static propTypes = {
        // 默认显示数量
        value: PropTypes.number,
        // 步进数
        step: PropTypes.number,
        // 最小数
        min: PropTypes.number,
        // 最大数
        max: PropTypes.number,
        // 获取焦点时
        onFocus: PropTypes.func,
        // 数值改变时
        onChange: PropTypes.func,
        // 离开焦点时
        onBlur: PropTypes.func,
        // 增/减 按钮点击时
        onButtonClick: PropTypes.func,
        // 是否禁用
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        value: null,
        step: 1,
        min: 1,
        max: null,
        onFocus: () => {},
        onChange: () => {},
        onBlur: () => {},
        onButtonClick: () => {},
        disabled: false
    };

    constructor(props) {
        super(props);

        const value = props.value || props.min || 1;

        this.state = {
            num: value,
            disableAddButton: props.max && value === props.max,
            disableCutButton: value === props.min
        };

        // 存储高度，用户判读是否需要滑动视图
        this.scroll = document.documentElement.clientHeight;

        this.add = this.add.bind(this);
        this.cut = this.cut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps && nextProps.value) {
            this.setState({
                num: nextProps.value,
                disableAddButton: nextProps.value === nextProps.max,
                disableCutButton: nextProps.value === nextProps.min
            })
        }
    }

    /**
     * 增加数量
     */
    add(e) {
        e.stopPropagation();
        if (this.props.max && this.props.max <= this.state.num) {
            this.setState({
                disableAddButton: true
            });
            return;
        }

        const value = this.state.num + this.props.step;

        if (!this.props.value) {
            this.setState({
                num: value,
                disableAddButton: value === this.props.max,
                disableCutButton: false,
            });
        }

        this.props.onButtonClick(value);
    }

    /**
     * 删除数量
     */
    cut(e) {
        e.stopPropagation();
        if (this.props.min >= this.state.num) {
            this.setState({
                disableCutButton: true
            });
            return;
        }

        const value = this.state.num - this.props.step;

        if (!this.props.value) {
            this.setState({
                num: value,
                disableAddButton: false,
                disableCutButton: value === this.props.min
            });
        }

        this.props.onButtonClick(value);
    }

    /**
     * input变化
     *
     * @param {object} e 事件对象
     */
    handleChange(e) {
        const { onChange } = this.props;
        const val = parseInt(e.target.value, 10);

        this.setState({
            num: val
        });

        onChange(val);
    }

    handleFocus(e) {
        e.preventDefault();

        // 解决安卓输入页面未上滑
        if (isMobile.android.phone) {
            const interval = setInterval(() => {
                if (document.documentElement.clientHeight !== this.scroll) {
                    this.stepperRef.scrollIntoViewIfNeeded();
                    clearInterval(interval);
                }
            }, 100);
        }

        this.props.onFocus();
    }

    /**
     * input失去焦点
     *
     * @param {object} e 事件对象
     */
    handleBlur(e) {
        const { onBlur, max, min } = this.props;
        const val = parseInt(e.target.value, 10);

        let showValue = val;

        if (val >= max && max) {
            showValue = max;
        }

        if (val < min || !showValue) {
            showValue = min;
        }

        if (!this.props.value) {
            this.setState({
                num: showValue,
                disableAddButton: showValue === this.props.max,
                disableCutButton: showValue === this.props.min,
            });
        }

        onBlur(showValue);
    }

    render() {
        const { num, disableAddButton, disableCutButton } = this.state;
        const { disabled } = this.props;

        return (
            <div className="stepper" ref={ref => { this.stepperRef = ref }}>
                <div
                    className={classnames('stepper-button', 'stepper-cut', { disable: disableCutButton || disabled })}
                    onClick={!disabled && this.cut}
                >
                    <Icon
                        className="stepper-icon"
                        type={cutIcon}
                    />
                </div>
                <div className="stepper-put">
                    <input
                        disabled={disabled}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onClick={this.handleFocus}
                        value={num}
                        type="number"
                    />
                </div>
                <div
                    className={classnames('stepper-button', 'stepper-add', { disable: disableAddButton || disabled })}
                    onClick={!disabled && this.add}
                >
                    <Icon
                        className="stepper-icon"
                        type={addIcon}
                    />
                </div>
            </div>
        )
    }
}

export default Stepper;

/**
 * @file searchNavBar.js
 * @author lihuanji
 *
 * 带搜索导航栏
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavBar, SearchBar } from 'antd-mobile';
import classnames from 'classnames';
import Native from 'src/native';
import back from './back.svg';

/**
 * 内容容器
 * @param props
 * @constructor
 */
export const SearchBarContentLayout = (props) => (
    <div className="ym-search-bar-content-layout">
        {props.children}
    </div>
)

SearchBarContentLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

class SearchNavBar extends PureComponent {
    static propTypes = {
        /**
         * class
         */
        className: PropTypes.string,
        /**
         *  默认显示搜索值
         */
        defaultValue: PropTypes.string,
        /**
         * placeholder
         */
        placeholder: PropTypes.string,
        /**
         * 点击搜索
         */
        onSubmit: PropTypes.func,
        /**
         * 点击清除
         */
        onClear: PropTypes.func,
        /**
         * 获取焦点
         */
        onFocus: PropTypes.func,
        /**
         * 失去焦点
         */
        onBlur: PropTypes.func,
        /**
         * 是否需要重新传入defaultValue 改变当前值
         */
        isChangeDefaultValue: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        defaultValue: '',
        placeholder: '请输入商品或关键字',
        onSubmit: () => {},
        onClear: () => {},
        onFocus: () => {},
        onBlur: () => {},
        isChangeDefaultValue: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultValue !== nextProps.defaultValue && this.props.isChangeDefaultValue) {
            this.setState({
                value: nextProps.defaultValue
            })
        }
    }

    /**
     *  变化输入框值
     *
     * @param value
     */
    onChange(value) {
        this.setState({value});
    }

    clear() {
        this.setState({
            value: '',
        })
    }

    render() {
        const { value } = this.state;
        const { className, onSubmit, onClear, onFocus, onBlur, placeholder } = this.props;

        return (
            <NavBar
                className={classnames('search-nav-bar', className)}
                onLeftClick={() => Native.goBack()}
                iconName={back}
            >
                <SearchBar
                    value={value}
                    placeholder={placeholder}
                    onSubmit={v => onSubmit(v)}
                    onClear={v => onClear(v)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onCancel={v => onSubmit(v)}
                    showCancelButton
                    cancelText="搜索"
                    onChange={this.onChange}
                    autoFocus
                />
            </NavBar>
        )
    }
}

export default SearchNavBar;

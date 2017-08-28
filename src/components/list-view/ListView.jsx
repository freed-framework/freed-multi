/**
 * @file ListView.jsx
 * @author lihuanji
 *
 *  长列表
 *
 *  1. 瀑布流加载
 *  2. 下拉刷新
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, RefreshControl } from 'antd-mobile';
import { forceCheck } from 'react-lazyload';
import mitt from 'mitt';

const emitter = mitt();

class ListViewComponent extends PureComponent {
    static propTypes = {
        /**
         * id dom节点ID 用于设置高度
         */
        id: PropTypes.string,
        /**
         * class
         */
        className: PropTypes.string,
        /**
         *  渲染单个函数
         */
        renderItemFunc: PropTypes.func.isRequired,
        /**
         * 获取数据函数
         *
         * @return {Promise} object
         *    {
         *      data: {array},
         *      hasMore: {bool}
         *    }
         */
        getMoreDataFunc: PropTypes.func.isRequired,
        /**
         * 下拉刷新数据
         *
         * @return {Promise} array
         *    [data]
         */
        getRefreshDataFunc: PropTypes.func,
        /**
         * 是否瀑布流(加载更多)
         */
        isLoadMore: PropTypes.bool,
        /**
         * 是否下拉刷新
         */
        isRefresh: PropTypes.bool,
        /**
         * 滚动事件
         */
        onScroll: PropTypes.func,
        /**
         * 没有更多的时候，底部显示文字
         */
        noMoreText: PropTypes.string,
    };
    static defaultProps = {
        id: '',
        className: '',
        getRefreshDataFunc: () => {},
        isLoadMore: false,
        isRefresh: false,
        onScroll: () => {},
        noMoreText: '抱歉，没有更多商品啦~'
    };
    constructor(props) {
        super(props);

        this.rData = [];

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            list: ds.cloneWithRows(this.rData),
            isLoading: false,
            hasMore: true,
            refreshing: false,
            isActiveRefresh: false,
        };

        this.onEndReached = this.onEndReached.bind(this);
        this.getListData = this.getListData.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.activeRefresh = this.activeRefresh.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.getListData();

        emitter.on('listen', promiseFunc => this.activeRefresh(promiseFunc));
    }

    onScroll(e) {
        forceCheck();
        this.props.onScroll(e);
    }

    onEndReached() {
        if (!this.state.hasMore) {
            return;
        }

        this.getListData();
    }

    onRefresh() {
        if (this.state.refreshing) {
            return;
        }

        this.setState({ refreshing: true });

        this.props.getRefreshDataFunc().then((data) => {
            this.rData = data.data;

            this.setState({
                list: this.state.list.cloneWithRows(this.rData),
                refreshing: false,
                hasMore: data.hasMore
            });
        })
    }

    getListData() {
        if (this.state.isLoading) {
            return;
        }

        if (this.state.isActiveRefresh) {
            return;
        }

        this.setState({
            isLoading: true
        }, () => {
            this.props.getMoreDataFunc().then((data) => {
                this.rData = this.rData.concat(data.data);

                this.setState({
                    list: this.state.list.cloneWithRows(this.rData),
                    isLoading: false,
                    hasMore: data.hasMore
                });
            });
        });
    }

    /**
     * 主动刷新 并且清空之前数据
     * 用于条件发生变化
     *
     * @param promiseFunc
     */
    activeRefresh(promiseFunc) {
        if (this.state.isLoading) {
            return;
        }

        this.setState({
            isLoading: true,
            isActiveRefresh: true,
            hasMore: true,
            list: this.state.list.cloneWithRows([]),
        }, () => {
            promiseFunc().then((data) => {
                this.rData = data.data;

                this.setState({
                    list: this.state.list.cloneWithRows(data.data),
                    isLoading: false,
                    hasMore: data.hasMore,
                    isActiveRefresh: false
                });
            })
        });
    }

    renderRow(rowData) {
        return this.props.renderItemFunc(rowData);
    }

    render() {
        const { list, hasMore, isLoading } = this.state;
        const { id, className, isLoadMore, isRefresh, noMoreText } = this.props;
        const refresh = {};

        refresh.scrollerOptions = {
            scrollbars: true,
        };

        refresh.useZscroller = true;

        if (isRefresh) {
            refresh.refreshControl = (<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
            />);
        }

        return (
            <div
                id={id}
                className={className}
                style={{height: 200}}
            >
                <ListView
                    dataSource={list}
                    renderFooter={() => {
                        if (!isLoadMore) {
                            return null;
                        }

                        let text = noMoreText;

                        if (hasMore) {
                            text = isLoading ? '加载中...' : '上拉加载更多';
                        }

                        return (
                            <div style={{textAlign: 'center'}}>
                                {text}
                            </div>
                        )
                    }}
                    style={{
                        height: 'inherit',
                        overflow: 'auto',
                    }}
                    scrollRenderAheadDistance={500}
                    onEndReachedThreshold={100}
                    renderRow={this.renderRow}
                    onEndReached={isLoadMore ? this.onEndReached : () => {}}
                    pageSize={10}
                    onScroll={this.onScroll}
                    {...refresh}
                />
            </div>
        )
    }
}

export default ListViewComponent;

/**
 * 主动刷新 并且清空之前数据
 * 用于条件发生变化
 *
 * @param promiseFunc
 */
export const activeRefresh = (promiseFunc) => {
    emitter.emit('listen', promiseFunc);
};

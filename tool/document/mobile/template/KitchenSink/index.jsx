import React from 'react';
import {Link} from 'react-router';
import {Icon, Drawer, List, Flex} from 'antd-mobile';
import Page from './Page';
import Item from './Item';
import config from '../../';

const hashImgObj = {
    'action-sheet': 'cYmaBafYBnAxCqQ',
    'activity-indicator': 'yVtRfZGoDxXObTK',
    alert: 'XdSYKalBelFOMqd',
    badge: 'UwUpBYPYnlwVicM',
    button: 'ZRDUYEzfOzKWdzE',
    carousel: 'FbIGJuDaiQoKNvj',
    checkbox: 'dWPGltvdjaanrRd',
    collapse: 'yIQQHiTULgYehij',
    'date-picker': 'IQtMSWmYwLEuqln',
    drawer: 'oSokuHUVgeoTLJl',
    popup: 'gfWmRfZNzMyVUss',
    popover: 'iIOLFHTKUCxBgUV',
    flex: 'zFqYaBWIPpYYORq',
    'float-menu': 'dSOLngHNazulnFR',
    grid: 'UBGcnLKfVQIXgUb',
    icon: 'yhnfleZZoezOjtU',
    'image-picker': 'NDsSvklLUeodsHK',
    'input-item': 'SdSqpihcSBoBrFO',
    list: 'tiapjpdKPQGHhnC',
    'list-action': 'nIYrkZcGvKXjQhX',
    'list-view': 'lMztpIPTRAIWGIP',
    menu: 'QeVVHHEAhSiVtXt',
    modal: 'HzRRcuwtqUCCOBg',
    'nav-bar': 'qzZlligUfwgFjwD',
    result: 'jFrmGCOsQeEUrnR',
    picker: 'STBLvEutBwPySbL',
    progress: 'ihijukOXDlqXvPS',
    radio: 'MJszdVSBKhtGmIP',
    'refresh-control': 'nUAtybajGulmcSM',
    'search-bar': 'QnAmpSwlfPzjpSL',
    slider: 'mCyccAjoVLFVhSH',
    stepper: 'eYnIAokGATNUxlD',
    steps: 'nvQVDIUiTmXcJtO',
    switch: 'ITFdMlELFchsTmz',
    tabs: 'stWeDgdtEIKoiTU',
    tag: 'gfstSzAhvXqKyEg',
    'textarea-item': 'PfzuWlDVfndrQUK',
    timeline: 'aIomfcRsRHmPyNo',
    toast: 'nREwETegxvDndJZ',
    'notice-bar': 'EFpWULKNsectBDK',
    'white-space': 'NfomhEsOdhFxEws',
    'wing-blank': 'DUkfOYZVcLctGot',
    card: 'daARhPjKcxlSuuZ',
    tooltip: 'RvpANXExTEUwQTV',
    pagination: 'fOQwMYUYaRRKYtd',
    loading: 'DyAmULrLMBrgoOy',
    table: 'TbRxKTMOzgrCvMR',
    form: 'hZDnBrVwPmrgrLq',
    'swipe-action': 'nlDYwTsLwJdnaKc',
    accordion: 'jGVfAYlFPECtWvI',
    'tab-bar': 'OZInMeAaDCHtaJU',
    'segmented-control': 'qCqRFuSbewqIWyv',
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onOpenChange = this.onOpenChange.bind(this);
    }

    onOpenChange() {
        this.setState({open: !this.state.open});
    }

    render() {
        const {picked} = this.props;
        const components = picked.components;

        const customWidth = (document.documentElement.clientWidth / 3);
        const itemStyle = {
            width: `${customWidth}px`,
            height: `${customWidth >= 138 * window.devicePixelRatio ? 138 * window.devicePixelRatio : customWidth}px`,
            display: 'inline-block',
        };

        const lists = {};
        components.forEach(i => {
            const meta = i.meta;
            if (!lists[meta.category]) {
                lists[meta.category] = [];
            }
            lists[meta.category].push(meta);
        });

        const sidebar = (<div>
            <div className="demo-drawer-home">
                <Link to="/">Mobile Silk</Link>
            </div>
            {Object.keys(lists)
                .sort((a, b) => config.categoryOrder[a] - config.categoryOrder[b])
                .map((cate, index) => (
                    <List
                        key={index}
                        renderHeader={() => cate}
                    >
                        {
                            lists[cate].map((item, ii) => {
                                const fileName = item.filename.split('/')[1];
                                return (<List.Item key={ii}>
                                    <Link to={`/${fileName}/`}>{item.english}
                                        <span
                                            style={{fontSize: 24, color: '#888'}}
                                        >
                      {item.chinese}
                    </span>
                                    </Link>
                                </List.Item>);
                            })
                        }
                    </List>
                ))}
        </div>);

        const drawerProps = {
            open: this.state.open,
            position: 'left',
            onOpenChange: this.onOpenChange,
        };

        return (<div>
            <div className="demo-drawer-trigger">
                <span onClick={this.onOpenChange}><Icon type="bars"/></span>
            </div>
            <div className="demo-drawer-container">
                <Drawer sidebar={sidebar} dragHandleStyle={{display: 'none'}} {...drawerProps}>
                    <Page
                        logo="https://zos.alipayobjects.com/rmsportal/wIjMDnsrDoPPcIV.png"
                        title="Mobile Silk"
                        subtitle=""
                        isIndex
                    >
                        {Object.keys(lists)
                            .sort((a, b) => config.categoryOrder[a] - config.categoryOrder[b])
                            .map((cate, index) => (
                                <List
                                    key={index}
                                    renderHeader={() => cate}
                                >
                                    {(() => {
                                        const flexs = [];
                                        const flexItems = [];
                                        for (let i = 0; i < lists[cate].length; i++) {
                                            const ii = lists[cate][i];
                                            const fileName = ii.filename.split('/')[1];
                                            const img = hashImgObj[fileName] || 'nREwETegxvDndJZ';
                                            flexItems.push(<Item
                                                logo={`https://os.alipayobjects.com/rmsportal/${img}.png`}
                                                title={ii.chinese}
                                                subtitle={ii.english}
                                                style={itemStyle}
                                                key={`flexitem-${i}`}
                                                linkTo={`/${fileName}/`}
                                            />);
                                        }
                                        flexs.push(<Flex wrap="wrap" className="antm-demo-flex" key={`flex-${index}`}>
                                            {flexItems}
                                        </Flex>);
                                        return flexs;
                                    })()}
                                </List>
                            ))}
                    </Page>
                </Drawer>
            </div>
        </div>);
    }
}

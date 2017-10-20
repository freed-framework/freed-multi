import React from 'react';
import {Link} from 'react-router';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Article from './Article';
import ComponentDoc from './ComponentDoc';
import * as utils from '../utils';
import config from '../../';

const SubMenu = Menu.SubMenu;

export default class MainContent extends React.Component {
    static contextTypes = {
        intl: React.PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        if (!location.hash) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        } else {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                document.getElementById(decodeURI(location.hash.replace('#', ''))).scrollIntoView();
            }, 10);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    shouldComponentUpdate(nextProps) {
        const pathname = this.props.location.pathname;
        return pathname !== nextProps.location.pathname ||
            /^\/components\//i.test(pathname);
    }

    getActiveMenuItem(props) {
        return props.params.children || props.location.pathname;
    }

    fileNameToPath(filename) {
        const snippets = filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').split('/');
        return snippets[snippets.length - 1];
    }

    generateMenuItem(isTop, item) {
        const key = this.fileNameToPath(item.filename);
        let text;
        if (isTop) {
            text = item.title || item.chinese || item.english;
        } else {
            text = [
                (<span key="english">
          {item.title || item.english}
        </span>),
                (<span className="chinese" key="chinese">
          {item.subtitle || item.chinese}
        </span>),
            ];
        }
        const disabled = item.disabled;
        const url = item.filename.replace(/(\/index)?((\.zh-CN)|(\.en-US))?\.md$/i, '').toLowerCase();
        const child = !item.link ?
            (<Link to={/^components/.test(url) ? `${url}/` : url} disabled={disabled}>
                {text}
            </Link>) :
            (<a href={item.link} target="_blank" rel="noopener noreferrer" disabled={disabled}>
                {text}
            </a>);

        return (
            <Menu.Item key={key.toLowerCase()} disabled={disabled}>
                {child}
            </Menu.Item>
        );
    }

    isNotTopLevel(level) {
        return level !== 'topLevel';
    }

    generateSubMenuItems(obj) {
        const topLevel = (obj.topLevel || []).map(this.generateMenuItem.bind(this, true));
        const itemGroups = Object.keys(obj).filter(this.isNotTopLevel)
            .sort((a, b) => config.typeOrder[a] - config.typeOrder[b])
            .map((type, index) => {
                const groupItems = obj[type].sort((a, b) => (
                    (a.title || a.english).charCodeAt(0) - (b.title || b.english).charCodeAt(0)
                )).map(this.generateMenuItem.bind(this, false));
                return (
                    <Menu.ItemGroup key={index} className="sub-menu-item">
                        {groupItems}
                    </Menu.ItemGroup>
                );
            });
        return [...topLevel, ...itemGroups];
    }

    getModuleData() {
        const props = this.props;
        const pathname = props.location.pathname;
        const moduleName = /^components/.test(pathname) ?
            'components' : pathname.split('/').slice(0, 2).join('/');
        return moduleName === 'components' || moduleName === 'changelog' || moduleName === 'docs/react' ?
            [...props.picked.components, ...props.picked['docs/react'], ...props.picked.changelog] :
            props.picked[moduleName];
    }

    getMenuItems() {
        // const moduleData = this.props.moduleData;
        // const menuItems = utils.getMenuItems(moduleData, this.context.intl.locale);
        const moduleData = this.getModuleData();
        const menuItems = utils.getMenuItems(moduleData);

        const topLevel = this.generateSubMenuItems(menuItems.topLevel);
        const subMenu = Object.keys(menuItems).filter(this.isNotTopLevel)
            .sort((a, b) => config.categoryOrder[a] - config.categoryOrder[b])
            .map((category) => {
                const subMenuItems = this.generateSubMenuItems(menuItems[category]);
                return (
                    <SubMenu title={<h4>{category}</h4>} key={category}>
                        {subMenuItems}
                    </SubMenu>
                );
            });
        return [...topLevel, ...subMenu];
    }

    flattenMenu(menu) {
        if (menu.type === Menu.Item) {
            return menu;
        }

        if (Array.isArray(menu)) {
            return menu.reduce((acc, item) => acc.concat(this.flattenMenu(item)), []);
        }

        return this.flattenMenu(menu.props.children);
    }

    getFooterNav(menuItems, activeMenuItem) {
        const menuItemsList = this.flattenMenu(menuItems);
        let activeMenuItemIndex = -1;
        menuItemsList.forEach((menuItem, i) => {
            if (menuItem.key === activeMenuItem) {
                activeMenuItemIndex = i;
            }
        });
        const prev = menuItemsList[activeMenuItemIndex - 1];
        const next = menuItemsList[activeMenuItemIndex + 1];
        return {prev, next};
    }

    render() {
        const props = this.props;
        const activeMenuItem = this.getActiveMenuItem(props);
        const menuItems = this.getMenuItems();
        const {prev, next} = this.getFooterNav(menuItems, activeMenuItem);

        // const locale = this.context.intl.locale;
        // const moduleData = this.props.moduleData;
        // const localizedPageData = moduleData.filter((page) =>
        //   page.meta.filename.toLowerCase().startsWith(props.location.pathname)
        // )[0];

        const moduleData = this.getModuleData();
        const localizedPageData = props.localizedPageData;

        return (
            <div className="main-wrapper">
                <Row>
                    <Col lg={5} md={6} sm={24} xs={24}>
                        <Menu
                            className="aside-container" mode="inline"
                            openKeys={Object.keys(utils.getMenuItems(moduleData))}
                            selectedKeys={[activeMenuItem]}
                        >
                            {menuItems}
                        </Menu>
                    </Col>
                    <Col lg={19} md={18} sm={24} xs={24} className="main-container">
                        {
                            props.utils.get(props, 'pageData.demo') ? (
                                <ComponentDoc {...props} doc={localizedPageData} demos={props.demos}/>
                            ) : (
                                <Article {...props} content={localizedPageData}/>
                            )
                        }
                    </Col>
                </Row>
                <Row>
                    <Col
                        lg={{span: 19, offset: 5}}
                        md={{span: 18, offset: 6}}
                        sm={24} xs={24}
                    >
                        <section className="prev-next-nav">
                            {
                                prev ?
                                    React.cloneElement(prev.props.children, {className: 'prev-page'}) :
                                    null
                            }
                            {
                                next ?
                                    React.cloneElement(next.props.children, {className: 'next-page'}) :
                                    null
                            }
                        </section>
                    </Col>
                </Row>
            </div>
        );
    }
}

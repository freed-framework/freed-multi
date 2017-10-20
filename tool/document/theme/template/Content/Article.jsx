import React, {Children, cloneElement} from 'react';
import DocumentTitle from 'react-document-title';
import {getChildren} from 'jsonml.js/lib/utils';
import Timeline from 'antd/lib/timeline';
import * as utils from '../utils';

export default class Article extends React.Component {
    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        const links = document.querySelectorAll('.outside-link.internal');
        if (links.length === 0) {
            return;
        }
        const checkImgUrl = 'http://alipay-rmsdeploy-dev-image.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/JdVaTbZzPxEldUi.png';
        utils.ping(checkImgUrl, status => {
            if (status === 'responded') {
                links.forEach(link => (link.style.display = 'block'));
            }
        });
    }

    getArticle(article) {
        const {content} = this.props;
        const {meta} = content;
        if (!meta.timeline) {
            return article;
        }
        const timelineItems = [];
        let temp = [];
        Children.forEach(article.props.children, (child, i) => {
            if (child.type === 'h2' && temp.length > 0) {
                timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
                temp = [];
            }
            temp.push(child);
        });
        return cloneElement(article, {
            children: <Timeline>{timelineItems}</Timeline>,
        });
    }

    render() {
        const props = this.props;
        const content = props.content;

        const {meta, description} = content;
        const {title, subtitle, chinese, english} = meta;
        return (
            <DocumentTitle title={`${title || chinese || english} - Mobile Silk`}>
                <article className="markdown">
                    <h1>
                        {title || english}
                        {
                            (!subtitle && !chinese) ? null :
                                <span className="subtitle">{subtitle || chinese}</span>
                        }
                    </h1>
                    <em style={{fontStyle: 'italic', display: (meta.author ? 'block' : 'none')}}><i
                        className="anticon anticon-user" title="作者" style={{marginRight: '5px'}}></i>{meta.author}</em>
                    {
                        !description ? null :
                            props.utils.toReactComponent(
                                ['section', {className: 'markdown'}].concat(getChildren(description))
                            )
                    }
                    {
                        !(content.toc && meta.toc) ? null :
                            <section className="toc">{props.utils.toReactComponent(content.toc)}</section>
                    }
                    {
                        this.getArticle(props.utils.toReactComponent(
                            ['section', {className: 'markdown'}].concat(getChildren(content.content))
                        ))
                    }
                    {
                        props.utils.toReactComponent(
                            ['section', {
                                id: 'api',
                                className: 'markdown api-container',
                            }].concat(getChildren(props.content.api || ['placeholder']))
                        )
                    }
                </article>
            </DocumentTitle>
        );
    }
}

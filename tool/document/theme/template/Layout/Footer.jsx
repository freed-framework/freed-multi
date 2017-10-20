import React from 'react';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import {version as packageVersions} from 'antd-mobile/package.json';
import {docVersions} from '../../';


docVersions[packageVersions] = packageVersions;

export default class Footer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <footer id="footer">
                <ul>
                    <li>
                        <h2>源码</h2>
                        <div>
                            <a target="_blank " rel="noopener noreferrer" href="#">antd</a>
                        </div>
                    </li>
                    <li>
                        <h2>相关站点</h2>
                        <div><a href="#">G2</a> - 数据可视化</div>
                    </li>
                    <li>
                        <h2>联系我们</h2>
                        <a target="_blank" rel="noopener noreferrer" href="#">
                            反馈和建议
                        </a>
                    </li>
                    <li>
                        <div>©2016 Jingoal</div>
                        <div>Powered by <a href="https://github.com/benjycui/bisheng">BiSheng</a></div>

                    </li>
                </ul>
            </footer>
        );
    }
}

import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class LeftMenu extends Component {
    render() {
        return (
            <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><Link to='/dashboard'>首页 <span class="sr-only">(current)</span></Link></li>
                    <li><Link to='/job/list'>任务列表</Link></li>
                    <li><Link to='/job/registry'>注册中心</Link></li>
                    <li><a href="#">Export</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item</a></li>
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                    <li><a href="">More navigation</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li><a href="">Nav item again</a></li>
                    <li><a href="">One more nav</a></li>
                    <li><a href="">Another nav item</a></li>
                </ul>
            </div>
        );
    }
}

export default LeftMenu;

import React, { Component } from 'react';
import dashboard from './dashboard.css';
import Navbar from './component/Navbar';
import LeftMenu from './component/LeftMenu';
import Content from  './component/Content';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div class="container-fluid">
                    <div class="row">
                        <LeftMenu/>
                        <Content></Content>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;

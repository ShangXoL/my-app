import React, { Component } from 'react';
import AuthService from '../component/AuthService';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.AuthService = new AuthService();
        this.logout = this.logout.bind(this);
    }
    logout(){
        this.AuthService.logout();
        window.location.href="/login";
    }
    render() {
        return (
            <nav class="navbar navbar-inverse navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">任务调度中心</a>
                    </div>
                    <div id="navbar" class="navbar-collapse collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#" onClick={this.logout}>欢迎【{this.AuthService.getProfile().name}】注销</a></li>
                        </ul>
                        <form class="navbar-form navbar-right">
                            <input type="text" class="form-control" placeholder="Search..."/>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

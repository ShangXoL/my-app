import React, { Component } from 'react';
import signin from './signin.css';
import AuthService from './component/AuthService';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import Dashboard from "./Dashboard";

class Login extends Component {
    constructor(props){
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.AuthService = new AuthService();
    }
    componentWillMount(){
        if(this.AuthService.isLoggedIn()){
            this.props.history.push('/');
        }
    }
    handleFormSubmit(e){
        e.preventDefault();
        this.AuthService.login(this.state.name,this.state.password)
            .then(res => {
                alert('登录成功');
                window.location.href='/';
            })
            .catch(err => {
                alert(err.error);
            })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    render() {
        return (
            <div class="container">
                <form class="form-signin" onSubmit={this.handleFormSubmit}>
                    <h2 class="form-signin-heading">登录</h2>
                    <label class="sr-only">用户名</label>
                    <input id="inputEmail" name="name" class="form-control" placeholder="Email address" required autofocus onChange={this.handleChange}/>
                        <label class="sr-only">密码</label>
                        <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required onChange={this.handleChange}/>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> 记住我
                                </label>
                            </div>
                            <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
                </form>
            </div>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import Login from "./Login";
import Dashboard from "./Dashboard";
import JobList from './job/JobList';
import JobAdd from './job/JobAdd';
import JobHistoryList from './job/JobHistoryList';
import AuthService from './component/AuthService';

class App extends Component {
    constructor(props){
        super(props);
        this.AuthService =  new AuthService();
    }
  render() {
    return (
        <Router>
            <div>
                <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
                <PrivateRoute path ="/job/list" component={JobList}></PrivateRoute>
                <PrivateRoute path ="/job/add" component={JobAdd}></PrivateRoute>
                <PrivateRoute path ="/job/history" component={JobHistoryList}></PrivateRoute>
                <Route path="/login" component={Login}></Route>
                <PrivateRoute path="/dashboard" component={Dashboard}/>
            </div>
        </Router>
    );
  }
}

const auth = new AuthService();
const fakeAuth = {
    isAuthenticated: auth.isLoggedIn(),
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

export default App;

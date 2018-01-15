import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./Dashboard";
import JobList from './job/JobList';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Dashboard}></Route>
                <Route path ="/job/list" component={JobList}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
            </div>
        </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class BreadCrumb extends Component {
    constructor(props){
        super(props);
        this.state={link2:props.link2,title2:props.title2,title3:props.title2};
    }
    render() {
        return (
            <ol class="breadcrumb">
                <li><Link to="/">首页</Link></li>
                <li><Link to={this.state.link2}>{this.state.title2}</Link></li>
                <li class="active">{this.state.title3}</li>
            </ol>
        );
    }
}

export default BreadCrumb;

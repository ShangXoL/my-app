import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import LeftMenu from '../component/LeftMenu';
import BreadCrumb from '../component/BreadCrumb';
import PageNavigation from "../component/PageNavigation";
import decode from "jwt-decode";
import Config from '../utils/Config';

class JobList extends Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {jobs: [],pages:0};
    }

    componentWillMount(){
        if(!this.isLoggedIn()){
            this.props.history.push("/login");
        }
    }
    componentDidMount(){
        this.search();
    }
    search(){
        const query = '';
        const page = 0;
        const url = `${Config.domain}/job/search/?page=${page}`;
        this.fetch(url,{method: 'GET'}).then(rsp => {
            console.table(rsp);
            const results = rsp.result;
            console.table(results);
            this.setState({jobs:results.content});
            this.setState({pages:results.totalPages});
            //alert(this.state.pages+"ddddd");
        });
    }

    fetch(url,options){
        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'mode': 'cors'
        }
        if(this.isLoggedIn()){
            headers['Authorization'] = 'Bearer '+ this.getToken();
        }
        return fetch(url,{
            headers,
            ... options
        }).then(this._checkStatus)
            .then(response => response.json())
    }
    //判断当前是否已经登录
    isLoggedIn(){
        const token = this.getToken();
        let loggined = token && ! this.isTokenExpired(token);
        return loggined;
    }
    _checkStatus(response){
        if(response.status >= 200 && response.status<300){
            return response;
        }

        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    getToken(){
        return localStorage.getItem("token");
    }
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now()/1000){
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.error(error);
            return false;
        }
    }
    render() {
        var jobs = this.state.jobs.map(job=>
            <tr>
                <td>{job.id}</td>
                <td>{job.name}</td>
                <td>{job.cron}</td>
                <td>{job.description}</td>
                <td>{job.interfaceName}</td>
                <td>{job.method}</td>
                <td>{job.timeout}</td>
                <td>{job.registry}</td>
                <td>{job.type}</td>
            </tr>
        );
        return (
            <div>
                <Navbar/>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <div class="container-fluid">
                        <div class="row">
                            <LeftMenu/>
                            <BreadCrumb link2='/job/list' title2='任务管理' title3='任务列表'/>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>名称</th>
                                        <th>CRON</th>
                                        <th>描述</th>
                                        <th>接口</th>
                                        <th>方法</th>
                                        <th>超时</th>
                                        <th>注册中心</th>
                                        <th>类型</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {jobs}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <PageNavigation pages='1'/>
                </div>
            </div>
        );
    }
}

export default JobList;

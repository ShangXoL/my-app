import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import LeftMenu from '../component/LeftMenu';
import BreadCrumb from '../component/BreadCrumb';
import PageNavigation from "../component/PageNavigation";
import Config from '../utils/Config';
import AuthService from '../component/AuthService';

class JobList extends Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {jobs: [],pages:0};
        this.AuthService = new AuthService();
    }

    componentWillMount(){
        if(!this.AuthService.isLoggedIn()){
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
        this.AuthService.fetch(url,{method: 'GET'}).then(rsp => {
            console.table(rsp);
            const results = rsp.result;
            console.table(results);
            this.setState({jobs:results.content});
            this.setState({pages:results.totalPages});
            //alert(this.state.pages+"ddddd");
        });
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

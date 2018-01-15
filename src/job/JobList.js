import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import Navbar from '../component/Navbar';
import LeftMenu from '../component/LeftMenu';

class JobList extends Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {jobs: []};
    }

    componentDidMount(){
        this.search();
    }
    search(){
        const query = '';
        const page = 0;
        const url = `http://localhost:8080/job/search/?page=${page}`;
        axios.get(url)
            .then(rsp => {
                const results = rsp.data.result;
                console.info(results);
                this.setState({jobs:results.content});
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
                            <ol class="breadcrumb">
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/job/list">任务管理</Link></li>
                                <li class="active">任务列表</li>
                            </ol>
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
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li>
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default JobList;

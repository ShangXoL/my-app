import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import LeftMenu from '../component/LeftMenu';
import BreadCrumb from '../component/BreadCrumb';
import PageNavigation from "../component/PageNavigation";
import Config from '../utils/Config';
import AuthService from '../component/AuthService';

class JobHistoryList extends Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {histories: [],pages:0};
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
        const url = `${Config.domain}/job/history/?page=${page}`;
        this.AuthService.fetch(url,{method: 'GET'}).then(rsp => {
            console.table(rsp);
            const results = rsp.result;
            console.table(results);
            this.setState({histories:results.content});
            this.setState({pages:results.totalPages});
            //alert(this.state.pages+"ddddd");
        });
    }

    render() {
        var jobs = this.state.histories.map(history=>
            <tr>
                <td>{history.id}</td>
                <td>{history.jobId}</td>
                <td>{history.jobName}</td>
                <td>{history.cron}</td>
                <td>{history.status}</td>
                <td>{history.startedAt}</td>
                <td>{history.endedAt}</td>
                <td>{history.message}</td>
            </tr>
        );
        return (
            <div>
                <Navbar/>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <div class="container-fluid">
                        <div class="row">
                            <LeftMenu/>
                            <BreadCrumb link2='/job/list' title2='任务管理' title3='任务执行历史列表'/>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>任务ID</th>
                                        <th>名称</th>
                                        <th>CRON</th>
                                        <th>状态</th>
                                        <th>开始时间</th>
                                        <th>结束时间</th>
                                        <th>错误消息</th>
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

export default JobHistoryList;

import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import LeftMenu from '../component/LeftMenu';
import BreadCrumb from '../component/BreadCrumb';
import Config from '../utils/Config';
import AuthService from '../component/AuthService';

class JobAdd extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {registries: [],timeout:5000,type:'HTTP'};
        this.AuthService = new AuthService();
    }

    componentWillMount(){
        if(!this.AuthService.isLoggedIn()){
            this.props.history.push("/login");
        }
    }
    componentDidMount(){
        const url = `${Config.domain}/job/registry/all`;
        this.AuthService.fetch(url,{method: 'GET'}).then(rsp => {
            const results = rsp.result;
            this.setState({registries:results});
            //alert(this.state.pages+"ddddd");
        });
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    handleFormSubmit(e){
        e.preventDefault();
        const url = `${Config.domain}/job/add`;
        let body =  JSON.stringify({
            name:this.state.name,
            cron: this.state.cron,
            description:this.state.description,
            type:this.state.type,
            registry:this.state.registry,
            interfaceName:this.state.interfaceName,
            method:this.state.method,
            timeout:this.state.timeout
        });
        this.AuthService.fetch(url,{method: 'POST',body:body}).then(rsp => {
            const results = rsp.result;
            if(rsp.success){
                alert('创建成功');
                this.props.history.replace("/job/list");
            }else{
                alert(rsp.error);
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <div class="container-fluid">
                        <div class="row">
                            <LeftMenu/>
                            <BreadCrumb link2='/job/list' title2='任务管理' title3='添加新任务'/>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    创建新的定时任务
                                </div>
                                <div class="panel-body">
                                    <form class="form-horizontal" role="form" onSubmit={this.handleFormSubmit}>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">任务名称：</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="focusedInput" name="name" type="text" placeholder="输入定时任务的名称..." onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-sm-2 control-label">CRON表达式：</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" id="disabledInput" type="text" name="cron" placeholder="正确的cron表达式..." onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="disabledSelect" class="col-sm-2 control-label">定时任务接口类型：</label>
                                            <div class="col-sm-10">
                                                <select id="disabledSelect" name="type" class="form-control" onChange={this.handleChange}>
                                                    <option>HTTP</option>
                                                    <option>DUBBO</option>
                                                    <option>EUREKA</option>
                                                    <option>CONSUL</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="disabledSelect" class="col-sm-2 control-label">服务注册中心：</label>
                                            <div class="col-sm-10">
                                                <select  class="form-control" name="registry" defaultValue={this.state.registries.length>0?this.state.registries[0]:''} onChange={this.handleChange}>
                                                    <option value="">请选择</option>
                                                    {
                                                        this.state.registries.length>0 && this.state.registries.map((item,i) =>{
                                                            return (
                                                                <option value={item.id}>{item.name}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-sm-2 control-label">接口地址：</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="interfaceName" id="disabledInput" type="text" placeholder="定时任务执行时调用的接口..." onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-sm-2 control-label">接口方法：</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="method" id="disabledInput" type="text" placeholder="定时任务执行时调用的接口方法名称，如果是HTTP类型，则是GET/POST/DELETE等..." onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-sm-2 control-label">接口超时时间（毫秒）：</label>
                                            <div class="col-sm-10">
                                                <input class="form-control" name="timeout" id="disabledInput" type="text" placeholder="超时时间..." value="5000" onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword" class="col-sm-2 control-label">描述：</label>
                                            <div class="col-sm-10">
                                                <textarea class="form-control" name="description" type="text" placeholder="描述信息..."  onChange={this.handleChange}></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-1">
                                                <button class="btn btn-sm btn-primary btn-block" type="submit">创建</button>
                                            </div>
                                            <div class="col-sm-1">
                                                <button class="btn btn-sm btn-block" type="submit">取消</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobAdd;

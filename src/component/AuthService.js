import decode from 'jwt-decode';
import Config from '../utils/Config';

export default class AuthService{
    constructor(){
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getToken = this.getToken.bind(this);
        this.setToken = this.setToken.bind(this);
        this.logout = this.logout.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }
    login(name,password){
        // Get a token
        console.log(name+":"+password);
        // Get a token
        return this.fetch(`${Config.domain}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                password
            })
        }).then(res => {
            if(res.success){
                this.setToken(res.result.token)
                return Promise.resolve(res);
            }else{
                return Promise.reject(res);
            }
        });
    }

    getProfile(){
        return decode(this.getToken());
    }
    fetch(url,options){
        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json'
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
    _checkStatus(response){
        if(response.status >= 200 && response.status<300){
            return response;
        }

        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    //判断当前是否已经登录
    isLoggedIn(){
        const token = this.getToken();
        let loggined = token && ! this.isTokenExpired(token);
        return loggined;
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
    logout(){
        localStorage.removeItem("access_token");
    }
    setToken(token){
        localStorage.setItem("access_token",token);
    }
    getToken(){
        return localStorage.getItem("access_token");
    }
}
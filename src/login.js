require('normalize.css/normalize.css');
require('styles/App.css');

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

require('es6-promise').polyfill();
import 'whatwg-fetch';

let api = require('./common/config').api;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		};
	}
	handleLogin() {
		return function() {
			if (this.state.userName == "") {
				alert("请输入用户名");
				this.refs.userName.focus();
				return false;
			}
			if (this.state.password == "") {
				alert("请输入密码");
				this.refs.password.focus();
				return false;
			}
			if (this.state.userName && this.state.password) {
				sinaSSOController.login(this.state.userName, this.state.password);
			}
		}.bind(this);
	}
	handleChangeUsr() {
		return function(event) {
			this.setState({
				userName: event.target.value
			})
		}.bind(this);
	}
	handleChangePwd() {
		return function(event) {
			this.setState({
				password: event.target.value
			})
		}.bind(this);
	}
	loginCallBack() {
		fetch(api.login, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
			}).then(function(json) {
				if (json && json.code == 0) {
					top.location.href = "/#/?platform=" + json.result.platform;
				} else {
					alert(json.message.global);
				}
			}).catch(e => {
				console.log(e);
				alert('数据获取失败');
			});
	}
	render() {
		return (
			<div className="login container">
				<div className="login-logo">
				</div>
				<form role="form">
				  <div className="form-group">
				    <input type="text" className="form-control" placeholder="请输入您的用户名" ref="userName" onChange={this.handleChangeUsr()}/>
				  </div>
				  <div className="form-group">
				    <input type="password" className="form-control" placeholder="请输入您的密码" ref="password" onChange={this.handleChangePwd()}/>
				  </div>
				  <div className="form-group">
				  	<button type="button" className="btn btn-success" onClick={this.handleLogin()}>登录</button>
				  </div>
				</form>
			</div>
		);
	}
	componentDidMount() {
		let _this = this;
		(function() {
			this.entry = "account";
			this.setDomain = false;
			this.customLoginCallBack = function(status) { // 登录回调代码 
				if (status && status.result) {
					_this.loginCallBack(status.userinfo.uniqueid);
				} else {
					alert(status.reason || "登录失败，请重试");
				}
			};
			this.customLogoutCallBack = function(status) {
				if (status && status.result) {
					top.location.href = "/login.html";
				} else {
					alert(status.reason || "注销登录失败，请重试");
				}
			};
		}).call(sinaSSOController);
	}
}

ReactDOM.render((<Login />), document.getElementById('app'));
require('normalize.css/normalize.css');
require('styles/App.css');

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');

import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
	handleLogin() {
		setTimeout(function() {
			window.location.href = './index.html';
		}, 0);
	}
	render() {
		return (
			<div className="login container">
				<div className="login-logo">
				</div>
				<form role="form">
				  <div className="form-group">
				    <input type="text" className="form-control" placeholder="请输入您的用户名" />
				  </div>
				  <div className="form-group">
				    <input type="password" className="form-control" placeholder="请输入您的密码" />
				  </div>
				  <div className="form-group">
				  	<button type="submit" className="btn btn-success" onClick={this.handleLogin}>登录</button>
				  </div>
				</form>
			</div>
		);
	}
}

ReactDOM.render((<Login />), document.getElementById('app'));
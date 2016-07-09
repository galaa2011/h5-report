require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');

require('es6-promise').polyfill();
import 'whatwg-fetch';

// config
let config = require('../../common/config');

let logo = require('../../images/logo.png');

class Logout extends React.Component {
	handleLogout() {
		return function() {
			fetch(config.api.logout, {
					credentials: 'same-origin'
				})
				.then(function(response) {
					if (response.ok) {
						return response.json();
					}
				}).then(function(json) {
					if (json && json.code == 0) {
						console.log(json.message.global);
						// top.location.href = "/login.html";
					} else {
						alert(json.message.global);
					}
				}).catch(e => {
					console.log(e);
					alert('数据获取失败');
				});
			sinaSSOController.logout();
		}.bind(this);
	}
	render() {
		return (
			<div>
				<div className="logout-container">
					<img className="logout-logo" src={logo}></img>
				</div>
				<div className="logout-des">
					<span>新浪扶翼 You are the one!</span>
					<small>版本 v1.0</small>
				</div>
				<div className="form-group">
				  	<button type="button" className="btn btn-danger btn-lg" onClick={this.handleLogout()}>{config.i18n.Logout}</button>
				</div>
			</div>
		);
	}
}

class Footer extends React.Component {
	render() {
		if (this.props.platform == '1') {
			return (
				<ul className="nav nav-tabs navbar-fixed-bottom">
				   <li className="footer-agent"><Link to="/main">{config.i18n.Agent}</Link></li>
			   		<li className="footer-advertiser"><Link to="/advertiser">{config.i18n.Advertiser}</Link></li>
				   <li className="footer-me active"><Link to="/about/1">{config.i18n.About}</Link></li>
				</ul>
			);
		} else {
			return (
				<ul className="nav nav-tabs navbar-fixed-bottom">
				   <li className="footer-client"><Link to="/detail">{this.props.userName || config.i18n.Advertiser}</Link></li>
				   <li className="footer-me active"><Link to="/about/0">{config.i18n.About}</Link></li>
				</ul>
			);
		}
	}
}

class About extends React.Component {
	render() {
		return (
			<div className="main">
				<div className="logout">
					<Logout />
				</div>
				<div className="tabFooter">
					<Footer platform={this.props.platform} userName={this.props.userName}/>
				</div>
			</div>
		);
	}
	componentDidMount() {
		let _this = this;
		(function() {
			this.entry = "account";
			this.setDomain = false;
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

About.defaultProps = {
};

export default About;
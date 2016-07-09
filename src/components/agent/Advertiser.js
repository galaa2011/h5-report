require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';
require('es6-promise').polyfill();
import 'whatwg-fetch';
import moment from 'moment';
import URLSearchParams from 'url-search-params';
import Table from 'components/base/Table';

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');

// config
let config = require('../../common/config');

class Tab extends React.Component {
	handleChange(value) {
		return function(e) {
			this.props.query(value);
		}.bind(this);
	}
	render() {
		return (
			<ul className="nav nav-tabs">
			   <li className="active today"><a href="#" data-toggle="tab" onClick={this.handleChange(0)}>{config.i18n.Today}</a></li>
			   <li className="yesterday"><a href="#" data-toggle="tab" onClick={this.handleChange(1)}>{config.i18n.Yesterday}</a></li>
			   <li className="lastWeek"><a href="#" data-toggle="tab" onClick={this.handleChange(7)}>{config.i18n.GQQT}</a></li>
			   <li className="season"><a href="#" data-toggle="tab" onClick={this.handleChange(30)}>{config.i18n.GQSST}</a></li>
			</ul>
		);
	}
}

class Footer extends React.Component {
	render() {
		return (
			<ul className="nav nav-tabs navbar-fixed-bottom">
			   <li className="footer-agent"><Link to="/main">{config.i18n.Agent}</Link></li>
			   <li className="active footer-advertiser"><Link to="/advertiser">{config.i18n.Advertiser}</Link></li>
			   <li className="footer-me"><Link to="/about/1">{config.i18n.About}</Link></li>
			</ul>
		);
	}
}

class Advertiser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			table: []
		};
	}
	loadData(value) {
		let _this = this;
		// 定义参数
		let startDate = moment().subtract(value, 'd').format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		let u = new URLSearchParams();
		u.append('startDate', startDate);
		u.append('endDate', endDate);
		u.append('webType', -1);
		// 发送请求
		fetch(config.api.a_clientStat + '?' + u, {credentials: 'same-origin'})
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
			}).then(function(json) {
				if (_this._isMounted && json && json.code == 0) {
					_this.setState({
						table: json.result
					});
				}
			}).catch(e => {
				console.log(e);
				alert('数据获取失败');
			});
	}
	query() {
		return function(value) {
			let _this = this;
			_this.loadData(value);
		}.bind(this);
	}
	render() {
		let chart = {};
		return (
			<div className="main">
				<div className="filter">
					<Tab query={this.query()} />
				</div>
				<div className="dataTable container">
					<Table option={config.tableOption.advertiserTable} data={this.state.table}/>
				</div>
				<div className="tabFooter">
					<Footer />
				</div>
      		</div>
		);
	}
	componentDidMount() {
		let _this = this;
		_this._isMounted = true;
		_this.loadData(0);
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
}

Advertiser.defaultProps = {
};

export default Advertiser;

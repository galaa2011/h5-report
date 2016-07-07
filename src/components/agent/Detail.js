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
	handleChange(tag, value) {
		return function(e) {
			this.props.query(tag, value);
		}.bind(this);
	}
	render() {
		return (
			<div>
				<ul className="nav nav-tabs tab-date">
					<li className="dropdown active date-select">
			      		<a href="#" id="tabDrop" className="dropdown-toggle" data-toggle="dropdown">日期<b className="caret"></b></a>
			      		<ul className="dropdown-menu" role="menu" aria-labelledby="tabDrop">
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 0)}>今日</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 1)}>昨日</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 7)}>过去7天</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 30)}>过去30天</a></li>
			            </ul>
			        </li>
				</ul>
				<ul className="nav nav-tabs">
				   	<li className="active tab-total"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', -1)}>汇总</a></li>
				   	<li className="tab-pc"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 0)}>PC</a></li>
				   	<li className="tab-wap"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 1)}>无线</a></li>
				</ul>
			</div>
		);
	}
}

class Footer extends React.Component {
	handleChange(value) {
		return function(e) {
			this.props.query(value);
		}.bind(this);
	}
	render() {
		return (
			<ul className="nav nav-tabs navbar-fixed-bottom">
			   <li className="footer-agent"><Link to="/main">代理商</Link></li>
			   <li className="footer-advertiser"><Link to="/advertiser">广告主</Link></li>
			</ul>
		);
	}
}

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			table: []
		};
	}
	loadData(date, plat) {

	}
	query() {
		return function(tag, value) {
			let _this = this;
			fetch(_this.props.source)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					console.log(json);
					_this.setState({
						table: [{
							pv: 3400,
							click: 55200,
							ctr: 90000
						}]
					});
				});
		}.bind(this);
	}
	render() {
		let chart = {};
		return (
			<div className="main">
				<div className="tabFilter">
					<Tab query={this.query()} />
				</div>
				<div className="dataTable container">
					<Table option={config.tableOption.detailTable} data={this.state.table}/>
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
		// 定义参数
		let startDate = moment().subtract(_this._date || 0, 'd').format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		let u = new URLSearchParams();
		u.append('startDate', startDate);
		u.append('endDate', endDate);
		u.append('webType', _this._plat || -1);
		// 发送请求
		fetch(config.api.a_dayStat + '?' + u, {credentials: 'same-origin'})
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
	componentWillUnmount() {
		this._isMounted = false;
	}
}

Detail.defaultProps = {
};

export default Detail;

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
			      		<a href="#" id="tabDrop" className="dropdown-toggle" data-toggle="dropdown">{config.i18n.RQ}<b className="caret"></b></a>
			      		<ul className="dropdown-menu" role="menu" aria-labelledby="tabDrop">
			         		<li className="active" style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 0)}>{config.i18n.Today}</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 1)}>{config.i18n.Yesterday}</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 7)}>{config.i18n.GQQT}</a></li>
			         		<li style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 30)}>{config.i18n.GQSST}</a></li>
			            </ul>
			        </li>
				</ul>
				<ul className="nav nav-tabs">
				   	<li className="active tab-total"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', -1)}>{config.i18n.ALL}</a></li>
				   	<li className="tab-pc"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 0)}>{config.i18n.PC}</a></li>
				   	<li className="tab-wap"><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 1)}>{config.i18n.WAP}</a></li>
				</ul>
			</div>
		);
	}
}

class Footer extends React.Component {
	render() {
		return (
			<ul className="nav nav-tabs navbar-fixed-bottom">
			   <li className="footer-client active"><Link to="/main">{this.props.userName || config.i18n.Advertiser}</Link></li>
			   <li className="footer-me"><Link to="/about/0">{config.i18n.About}</Link></li>
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
		let _this = this;
		date = date === undefined ? 0 : date;
		plat = plat === undefined ? -1 : plat;
		// 定义参数
		let startDate = moment().subtract(date, 'd').format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		let u = new URLSearchParams();
		u.append('startDate', startDate);
		u.append('endDate', endDate);
		u.append('webType', plat);
		// 发送请求
		fetch(config.api.c_dayStat + '?' + u, {
				credentials: 'same-origin'
			})
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
		return function(tag, value) {
			let _this = this;
			// 存储tag值
			if (tag == 'date') {
				_this._date = value;
			} else {
				_this._plat = value;
			}
			_this.loadData(_this._date, _this._plat);
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
					<Footer userName={this.props.userName}/>
				</div>
      		</div>
		);
	}
	componentDidMount() {
		let _this = this;
		_this._isMounted = true;
		_this.loadData(0, -1);
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
}

Detail.defaultProps = {
};

export default Detail;

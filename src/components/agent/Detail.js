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
		let total, pc, wap;
		if (this.props.date == 0) {
			total = 'active tab-total-75';
			pc = 'tabHide';
			wap = 'tabHide';
		} else {
			total = 'active tab-total';
			pc = 'tab-pc';
			wap = 'tab-wap';
		}
		return (
			<div>
				<ul className="nav nav-tabs tab-date">
					<li className="dropdown active date-select">
			      		<a href="#" id="tabDrop" className="dropdown-toggle" data-toggle="dropdown">{config.i18n.RQ}<b className="caret"></b></a>
			      		<ul ref="dateDrop" className="dropdown-menu" role="menu" aria-labelledby="tabDrop">
			         		<li value="0" className="active" style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 0)}>{config.i18n.Today}</a></li>
			         		<li value="1" style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 1)}>{config.i18n.Yesterday}</a></li>
			         		<li value="7" style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 7)}>{config.i18n.GQQT}</a></li>
			         		<li value="30" style={{textAlign: 'left'}}><a href="#" tabindex="-1" data-toggle="tab" onClick={this.handleChange('date', 30)}>{config.i18n.GQSST}</a></li>
			            </ul>
			        </li>
				</ul>
				<ul className="nav nav-tabs">
				   	<li className={total}><a href="#" data-toggle="tab" onClick={this.handleChange('plat', -1)}>{config.i18n.ALL}</a></li>
				   	<li className={pc}><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 0)}>{config.i18n.PC}</a></li>
				   	<li className={wap}><a href="#" data-toggle="tab" onClick={this.handleChange('plat', 1)}>{config.i18n.WAP}</a></li>
				</ul>
			</div>
		);
	}
}

class Footer extends React.Component {
	render() {
		return (
			<ul className="nav nav-tabs navbar-fixed-bottom">
			   <li className="footer-agent"><Link to="/main">{config.i18n.Agent}</Link></li>
			   <li className="footer-advertiser"><Link to="/advertiser">{config.i18n.Advertiser}</Link></li>
			   <li className="footer-me"><Link to="/about/1">{config.i18n.About}</Link></li>
			</ul>
		);
	}
}

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '0',
			table: []
		};
	}
	loadData(date, plat) {
		let _this = this;
		date = date === undefined ? _this.state.date : date;
		plat = plat === undefined ? -1 : plat;
		// 定义参数
		let startDate = moment().subtract(date, 'd').format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		let u = new URLSearchParams();
		u.append('startDate', startDate);
		u.append('endDate', endDate);
		u.append('webType', plat);

		// 判断表头名称【日期】<=>【时间】
		let _index = 0;
		if (date == 0) {
			for (let i = 0; i < config.tableOption.detailTable.columns.length; i++) {
				if (config.tableOption.detailTable.columns[i].field === 'statDate') {
					config.tableOption.detailTable.columns[i].title = '时间';
					_index = i;
					break;
				}
			};
		} else {
			config.tableOption.detailTable.columns[_index].title = '日期';
		}

		// 发送请求
		fetch(config.api.a_dayStat + '?' + u, {
				credentials: 'same-origin'
			})
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
			}).then(function(json) {
				if (_this._isMounted && json && json.code == 0) {
					_this.setState({
						date: date,
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
		let date = {
			'0': config.i18n.Today,
			'1': config.i18n.Yesterday,
			'7': config.i18n.GQQT,
			'30': config.i18n.GQSST
		};
		return (
			<div className="main">
				<div className="tabFilter">
					<Tab date={this.state.date} ref='tabFilter' query={this.query()} />
				</div>
				<div className="dateShow">
					<span>{date[this.state.date]}</span>
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

		let date;
		let query = location.hash.split('?')[1];
		let u = new URLSearchParams(query);
		date = u.get('date');
		_this.loadData(date, -1);
		// 渲染下拉时间
		let lis = this.refs.tabFilter.refs.dateDrop.children;
		for (let i = 0; i < lis.length; i++) {
			if (date == lis[i].value) {
				lis[i].className = 'active';
			} else {
				lis[i].className = '';
			}
		};
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
}

Detail.defaultProps = {
};

export default Detail;

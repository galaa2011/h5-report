import 'core-js/fn/array/map';
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';
require('es6-promise').polyfill();
import 'whatwg-fetch';
import moment from 'moment';
import URLSearchParams from 'url-search-params';
import Chart from 'components/base/Chart';
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
		// {"/detail?date=" + this.props.date}
		return (
			<ul className="nav nav-tabs navbar-fixed-bottom">
			   <li className="footer-client active"><Link to="/main">{this.props.userName || config.i18n.Advertiser}</Link></li>
			   <li className="footer-cme"><Link to="/about/0">{config.i18n.About}</Link></li>
			</ul>
		);
	}
}

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chart: {
				showTool: true,
				date: 0,
				series: [{
					name: '汇总',
					type: 'line',
					stack: '总量',
					areaStyle: {
						normal: {}
					},
					data: []
				}],
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: []
				}]
			},
			table: [],
			dataSeason: ''
		};
	}
	getQuarter() {
		let _date = ['12-26~03-25', '03-26~06-25', '06-26~09-25', '09-26~12-25'];
		let quarter = [],
			start,
			end,
			year = moment().year();
		_date.map((item, index) => {
			if (index == 0) {
				start = (year - 1) + '-' + item.split('~')[0];
				end = year + '-' + item.split('~')[1];
			} else {
				start = year + '-' + item.split('~')[0];
				end = year + '-' + item.split('~')[1];
			}
			if (moment().isBetween(start, end)) {
				quarter.push(start, end);
			}
		});
		return quarter;
	}
	loadData(value) {
		let _this = this;
		let startDate = moment().subtract(value, 'd').format('YYYY-MM-DD');
		let endDate = moment().format('YYYY-MM-DD');
		let u = new URLSearchParams();
		u.append('startDate', startDate);
		u.append('endDate', endDate);
		// 获取当季日期
		let quarter = _this.getQuarter();
		let u2 = new URLSearchParams();
		u2.append('startDate', quarter[0]);
		u2.append('endDate', quarter[1]);

		// 两个请求，都完成后再进行state的变化。
		Promise.all([
				fetch(config.api.c_summaryall + '?' + u, {credentials: 'same-origin'}).then(response => response.json()),
				fetch(config.api.c_dayStat + '?' + u + '&webType=-1', {credentials: 'same-origin'}).then(response => response.json()),
				fetch(config.api.c_confirmCost + '?' + u2, {credentials: 'same-origin'}).then(response => response.json())
			])
			.then((jsons) => {
				let table = [],
					chart = {},
					series_data = [],
					xAxis_data = [],
					dataSeason = '';
				if (jsons[0].code == 0) {
					table.push(jsons[0].result);
				}
				if (jsons[1].code == 0) {
					jsons[1].result.map(data => {
						series_data.push(data.cost);
						xAxis_data.push(data.statDate);
					});
				}
				if (jsons[2].code == 0) {
					dataSeason = jsons[2].result;
				}
				this.setState({
					chart: {
						showTool: true,
						date: value,
						series: [{
							name: '汇总',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							data: series_data
						}],
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: xAxis_data
						}]
					},
					table: table,
					dataSeason: dataSeason
				});
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
		return (
			<div className="main">
				<div className="tabFilter">
					<Tab query={this.query()}/>
				</div>
				<div className="dataSeason">
					<span>当季业绩: {this.state.dataSeason} 元</span>
				</div>
				<div className="dataChart container">
					<Chart data={this.state.chart}/>
				</div>
				<div className="dataTable container">
					<Table option={config.tableOption.mainTable} data={this.state.table}/>
				</div>
				<div className="tabFooter">
					<Footer date={this.state.chart.date} userName={this.props.userName}/>
				</div>
      		</div>
		);
	}
	componentDidMount() {
		let _this = this;
		_this.loadData(0);
	}
}

Client.defaultProps = {
};

export default Client;

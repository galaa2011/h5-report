require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
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
			   <li className="active today"><a href="#home" data-toggle="tab" onClick={this.handleChange(1)}>今日</a></li>
			   <li className="yesterday"><a href="#detail" data-toggle="tab">昨天</a></li>
			   <li className="lastWeek"><a href="#ios" data-toggle="tab">过去7天</a></li>
			   <li className="season"><a href="#ios" data-toggle="tab">过去30天</a></li>
			</ul>
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
			   <li className="footer-client"><Link to="/detail">XXXX广告主</Link></li>
			</ul>
		);
	}
}

class Client extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				today: '',
				yesterday: '',
				lastWeek: '',
				season: ''
			},
			chart: {
				series: [{
					// name: 'PC',
					type: 'line',
					// // stack: '总量',
					// areaStyle: {
					// 	normal: {}
					// },
					// data: []
				}, {
					// name: '无线',
					type: 'line',
					// stack: '总量',
					// areaStyle: {
					// 	normal: {}
					// },
					// data: []
				}],
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: []
				}]
			},
			table: []
		};
	}
	query() {
		return function(value) {
			let _this = this;
			fetch(_this.props.source)
				.then(function(response) {
					return response.json();
				}).then(function(json) {
					console.log(json);
					_this.setState({
						filter: {
							today: '78902',
							yesterday: '78902',
							lastWeek: '78902',
							season: '1234567890'
						},
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
					<Tab query={this.query()}/>
				</div>
				<div className="dataChart container">
					<Chart data={this.state.chart}/>
				</div>
				<div className="dataTable container">
					<Table option={config.tableOption.mainTable} data={this.state.table}/>
				</div>
				<div className="tabFooter">
					<Footer />
				</div>
      		</div>
		);
	}
	componentDidMount() {
		let _this = this;
		// fetch(_this.props.source)
		fetch('https://api.github.com/users/octocat/gists')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				_this.setState({
					filter: {
						today: '78902',
						yesterday: '78902',
						lastWeek: '78902',
						season: '1234567890'
					}
				});
			});
	}
}

Client.defaultProps = {
};

export default Client;

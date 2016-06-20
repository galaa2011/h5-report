require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-table/dist/bootstrap-table');
require('bootstrap-table/dist/bootstrap-table.css');
require('../../common/bootstrap-table-zh-CN');

// api
let api = require('../../common/config').api;

class Filter extends React.Component {
	handleChange() {
		return function(e) {
			this.props.query(e.target.value);
		}.bind(this);
	}
	render() {
		return (
			<div className="filter-container">
			    <div className="form-group col-xs-5">
			        <select className="form-control" onChange={this.handleChange()}>
			          	<option value="0">今日</option>
			          	<option value="1">过去7天</option>
			          	<option value="2">过去30天</option>
			        </select>
			    </div>
			    <div className="total">
			        <span className="total-info">今日消耗: {this.props.data.today}元</span>
			        <span className="total-info">昨日消耗: {this.props.data.yesterday}元</span>
			        <span className="total-info">过去7天消耗: {this.props.data.lastWeek}元</span>
			        <span className="total-info">当季业绩: {this.props.data.season}元</span>
			    </div>
			</div>
		);
	}
}

class Tab extends React.Component {
	handleChange(value) {
		return function(e) {
			this.props.query(value);
		}.bind(this);
	}
	render() {
		return (
			<ul className="nav nav-tabs">
				<li className="dropdown active tab-date">
		      		<a href="#" id="myTabDrop1" className="dropdown-toggle" data-toggle="dropdown">日期<b className="caret"></b></a>
		      		<ul className="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
		         		<li style={{textAlign: 'left'}}><a href="#jmeter" tabindex="-1" data-toggle="tab">今日</a></li>
		         		<li style={{textAlign: 'left'}}><a href="#ejb" tabindex="-1" data-toggle="tab">昨日</a></li>
		         		<li style={{textAlign: 'left'}}><a href="#jmeter" tabindex="-1" data-toggle="tab">过去7天</a></li>
		         		<li style={{textAlign: 'left'}}><a href="#ejb" tabindex="-1" data-toggle="tab">过去30天</a></li>
		            </ul>
		        </li>
			   	<li className="tab-total"><a href="#home" data-toggle="tab" onClick={this.handleChange(1)}>汇总</a></li>
			   	<li className="tab-pc"><a href="#detail" data-toggle="tab">PC</a></li>
			   	<li className="tab-wap"><a href="#ios" data-toggle="tab">无线</a></li>
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
			   <li className="footer-agent"><Link to="/main">代理商</Link></li>
			   <li className="footer-advertiser"><Link to="/advertiser">广告主</Link></li>
			</ul>
		);
	}
}

class Table extends React.Component {
	render() {
		return (
			<table 
  				ref="table"
				data-striped='true'
				data-classes="table table-no-bordered"
           		data-toolbar="#toolbar"
           		data-show-toggle="true"
           		data-show-columns="true"
           		data-minimum-count-columns="2"
           		data-search="true"
           		data-pagination="true"
           		data-page-list="[10, 25, 50, 100, ALL]"
           		data-id-field="id">
    		</table>
    	);
	}
	componentDidUpdate() {
		let data = this.props.data;
		let data2 = [{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		},{
			pv: 100,
			click: 200,
			ctr: 3000000
		}];
		$(this.refs.table).bootstrapTable('load', data.length != 0 ? data : data2);
	}
	componentDidMount() {
		let data = this.props.data;
		$(this.refs.table).bootstrapTable({
			columns: [{
				field: 'pv',
				title: 'PV'
			}, {
				field: 'click',
				title: '点击'
			}, {
				field: 'ctr',
				title: 'CTR'
			}, {
				field: 'cpc',
				title: 'CPC'
			}, {
				field: 'ecpm',
				title: 'eCPM',
				formatter: function(value, row, index) {
					value = $.trim(value);
					return value;
				}
			}, {
				field: 'consume',
				title: '消耗'
			}],
			responseHandler: function(res) {
				res.rows = [{
					id: 1,
					name: 'Item 1',
					ecpm: '$1'
				}, {
					id: 2,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 3,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 4,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 5,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 6,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 7,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 8,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 9,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 10,
					name: 'Item 2',
					ecpm: '$2'
				}, {
					id: 11,
					name: 'Item 2',
					ecpm: '$2'
				}];
				res.total = 100;
				return res;
			},
			queryParams: function(params) {
				params.uid = 1;
				return params;
			}
		});
		$(this.refs.table).bootstrapTable('load', data);
	}
}

class Advertiser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: {
				today: '',
				yesterday: '',
				lastWeek: '',
				season: ''
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
					<Tab query={this.query()} />
				</div>
				<div className="dataTable container">
					<Table data={this.state.table}/>
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
		// fetch(_this.props.source)
		fetch('https://api.github.com/users/octocat/gists')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				if (_this._isMounted) {
					_this.setState({
						filter: {
							today: '78902',
							yesterday: '78902',
							lastWeek: '78902',
							season: '1234567890'
						}
					});
				}
			});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
}

Advertiser.defaultProps = {
};

export default Advertiser;

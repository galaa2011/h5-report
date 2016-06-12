import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';

require('normalize.css/normalize.css');
require('styles/App.css');

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-table/dist/bootstrap-table');
require('bootstrap-table/dist/bootstrap-table.css');

// api
let api = require('../common/config').api;

import React from 'react';
import 'whatwg-fetch';

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

class Table extends React.Component {
	render() {
		return (
			<table 
  				ref="table"
           		data-toolbar="#toolbar"
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

class Agent extends React.Component {
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
				<div className="filter">
					<Filter query={this.query()} data={this.state.filter}/>
				</div>
				<div className="table">
					<Table data={this.state.table}/>
				</div>
      		</div>
		);
	}
	componentDidMount() {
		let _this = this;
		fetch(_this.props.source)
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

ReactDOM.render(<Agent source={api.getAgentInfo}/>, document.getElementById('app'));

// Agent.defaultProps = {
// };

// export default Agent;

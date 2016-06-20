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

// Echarts
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线、柱状图
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');

let detailImage = require('../../images/detail.ico');

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
			   <li className="active footer-agent"><Link to="/main">代理商</Link></li>
			   <li className="footer-advertiser"><Link to="/advertiser">广告主</Link></li>
			</ul>
		);
	}
}

class Chart extends React.Component {
	render() {
		return (
			<div className="chart-container" ref="chart"></div>
		);
	}
	componentDidUpdate() {
		// let series = this.props.data.series;
		let series = [{
			name: 'PC',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [120, 132, 101, 134, 90, 230, 210]
		}, {
			name: '无线',
			type: 'line',
			stack: '总量',
			areaStyle: {
				normal: {}
			},
			data: [150, 232, 201, 154, 190, 330, 410]
		}];
		let xAxis = [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}];
		this.option.baseOption.series = series;
		this.option.baseOption.xAxis = xAxis;
		this.myChart.clear();
		this.myChart.hideLoading();
		this.myChart.setOption(this.option);
	}
	componentDidMount() {
		let main = this.refs.chart;
		let series = this.props.data.series;
		let xAxis = this.props.data.xAxis;

		this.myChart = echarts.init(main);
		
		this.option = {
			baseOption: {
				title: {
					text: '堆叠区域图'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['PC', '无线']
				},
				toolbox: {
					itemSize: 24,
					feature: {
						// saveAsImage: {},
						myTool: {
							show: true,
							title: '详情',
							icon: 'image://' + detailImage,
							onclick: function() {
								location.href = '/#/detail';
							}
						}
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: xAxis,
				yAxis: [{
					type: 'value'
				}],
				series: series
			},
			media: [{
				query: {
					maxAspectRatio: 1 // 当长宽比小于1时。
				},
				option: {
					legend: { // legend 放在底部中间。
						right: 'center',
						top: 100,
						orient: 'vertical' // legend 横向布局。
					},
					series: [ // 两个饼图左右布局。
						{
							radius: [20, '50%'],
							center: ['50%', '30%']
						}, {
							radius: [30, '50%'],
							center: ['50%', '70%']
						}
					]
				}
			}]
		};

		this.myChart.showLoading();
		this.myChart.setOption(this.option);
		window.onresize = function() {
			this.myChart.resize();
		}.bind(this);
	}
}

class Table extends React.Component {
	render() {
		return (
			<table 
  				ref="table"
				data-classes="table table-no-bordered"
           		data-toolbar="#toolbar"
           		data-show-columns="true"
           		data-minimum-count-columns="2"
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

class AppComponent extends React.Component {
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

AppComponent.defaultProps = {
};

export default AppComponent;

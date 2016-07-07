require('normalize.css/normalize.css');
require('styles/Chart.css');

import React from 'react';

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

class Chart extends React.Component {
	render() {
		return (
			<div className="chart-container" ref="chart"></div>
		);
	}
	componentDidUpdate() {
		let series = this.props.data.series;
		let xAxis = this.props.data.xAxis;
		// let series = [{
		// 	name: 'PC',
		// 	type: 'line',
		// 	stack: '总量',
		// 	areaStyle: {
		// 		normal: {}
		// 	},
		// 	data: [120, 132, 101, 134, 90, 230, 210]
		// }, {
		// 	name: '无线',
		// 	type: 'line',
		// 	stack: '总量',
		// 	areaStyle: {
		// 		normal: {}
		// 	},
		// 	data: [150, 232, 201, 154, 190, 330, 410]
		// }];
		// let xAxis = [{
		// 	type: 'category',
		// 	boundaryGap: false,
		// 	data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		// }];
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

Chart.defaultProps = {
};

export default Chart;

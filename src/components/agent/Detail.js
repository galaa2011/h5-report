require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
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

class Detail extends React.Component {
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

Detail.defaultProps = {
};

export default Detail;

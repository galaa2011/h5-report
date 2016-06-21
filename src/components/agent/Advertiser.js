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
			   <li className="footer-agent"><Link to="/main">代理商</Link></li>
			   <li className="active footer-advertiser"><Link to="/advertiser">广告主</Link></li>
			</ul>
		);
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
				<div className="filter">
					<Tab query={this.query()} />
				</div>
				<div className="dataTable container">
					<Table option={config.tableOption.advertiserTable} data={this.state.table}/>
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

'use strict';

let baseConfig = {};

let i18n = {
	RQ: '日期',
	Today: '今天',
	Yesterday: '昨天',
	GQQT: '过去7天',
	GQSST: '过去30天',

	ALL: '汇总',
	PC: 'PC',
	WAP: '无线',

	Advertiser: '广告主',
	Agent: '代理商',
	About: '关于',

	Login: '登录',
	Logout: '退出登录'
}

let apiConfig = {
	login: '/api/login',
	logout: '/api/logout',
	a_summaryall: '/api/agent/summaryall',
	a_costByDay: '/api/agent/costByDay',
	a_clientStat: '/api/agent/clientStat',
	a_dayStat: '/api/agent/dayStat',
	c_summaryall: '/api/client/summaryall',
	c_costByDay: '/api/client/costByDay',
	c_dayStat: '/api/client/dayStat'
};
let mainTable = {
	columns: [{
		field: 'impression',
		title: 'PV',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'click',
		title: '点击',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'ctr',
		title: 'CTR',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'cpc',
		title: 'CPC',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'eCpm',
		title: 'eCPM',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'cost',
		title: '消耗',
		formatter: function(value, row, index) {
			value = value === -1 ? '-' : value;
			value = $.trim(value);
			return value;
		}
	}],
	responseHandler: function(res) {
		var data = {};
		data.rows = res;
		data.total = res.length;
		return data;
	},
	queryParams: function(params) {
		params.uid = 1;
		return params;
	}
};
let detailTable = {
	showToggle: true,
	search: true,
	pagination: true,
	// sidePagination: 'server',
	// url: apiConfig.a_dayStat,
	pageList: [10, 25, 50, 100, 'ALL'],
	columns: [{
		field: 'statDate',
		sortable: true,
		title: '日期'
	}, {
		field: 'click',
		title: '点击'
	}, {
		field: 'cpc',
		title: 'CPC'
	}, {
		field: 'ctr',
		title: 'CTR'
	}],
	responseHandler: function(res) {
		var data = {};
		data.rows = res;
		data.total = res.length;
		return data;
	},
	queryParams: function(params) {
		params.uid = 1;
		return params;
	}
};
let advertiserTable = {
	showToggle: true,
	search: true,
	pagination: true,
	pageList: [10, 25, 50, 100, 'ALL'],
	columns: [{
		field: 'clientName',
		title: '广告主'
	}, {
		field: 'click',
		sortable: true,
		title: '点击'
	}, {
		field: 'cpc',
		sortable: true,
		title: 'CPC'
	}, {
		field: 'ctr',
		sortable: true,
		title: 'CTR'
	}],
	responseHandler: function(res) {
		var data = {};
		data.rows = res;
		data.total = res.length;
		return data;
	},
	queryParams: function(params) {
		params.uid = 1;
		return params;
	}
};

let config = Object.assign({}, baseConfig, {
	i18n: i18n,
	api: apiConfig,
	tableOption: {
		mainTable: mainTable,
		detailTable: detailTable,
		advertiserTable: advertiserTable
	}
});

module.exports = config;
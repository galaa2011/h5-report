'use strict';

let baseConfig = {};

let apiConfig = {
	login: '/api/login',
	a_summaryall: '/api/agent/summaryall',
	a_costByDay: '/api/agent/costByDay',
	a_clientStat: '/api/agent/clientStat',
	a_dayStat: '/api/agent/dayStat'
};
let mainTable = {
	columns: [{
		field: 'impression',
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
		field: 'eCpm',
		title: 'eCPM',
		formatter: function(value, row, index) {
			value = $.trim(value);
			return value;
		}
	}, {
		field: 'cost',
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
};

let config = Object.assign({}, baseConfig, {
	api: apiConfig,
	tableOption: {
		mainTable: mainTable,
		detailTable: detailTable,
		advertiserTable: advertiserTable
	}
});

module.exports = config;
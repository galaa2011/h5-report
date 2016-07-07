require('normalize.css/normalize.css');
require('styles/Table.css');

import React from 'react';

// Bootstrap
require('bootstrap/dist/js/bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-table/dist/bootstrap-table');
require('bootstrap-table/dist/bootstrap-table.css');
require('../../common/bootstrap-table-zh-CN');

class Table extends React.Component {
	render() {
		return (
			<table 
				ref="table"
				data-striped='true'
				data-classes="table table-no-bordered"
				data-show-columns="true"
				data-minimum-count-columns="2"
				data-id-field="id">
			</table>
		);
	}
	componentDidUpdate() {
		let data = this.props.data;
		$(this.refs.table).bootstrapTable('load', data);
	}
	componentDidMount() {
		let data = this.props.data;
		$(this.refs.table).bootstrapTable(this.props.option);
		$(this.refs.table).bootstrapTable('load', data);
	}
}

Table.defaultProps = {
};

export default Table;

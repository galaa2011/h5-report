require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class Base extends React.Component {
	render() {
		return (
			<div className="main">
				{this.props.children}
      		</div>
		);
	}
}

Base.defaultProps = {
};

export default Base;

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Base from './components/base/Base';
import AgentMain from './components/agent/Main';
import AgentDetail from './components/agent/Detail';
import Advertiser from './components/agent/Advertiser';
import ClientMain from './components/client/Main';
import ClientDetail from './components/client/Detail';

let api = require('./common/config').api;

// Render the main component into the dom
// 判断代理商还是客户
if (false) {
	ReactDOM.render((
		<Router history={hashHistory}>
			<Route path="/" component={Base}>
			 	<IndexRoute component={AgentMain} />
	    		<Route path="/main" component={AgentMain} />
	    		<Route path="/detail" component={AgentDetail} />
	    		<Route path="/advertiser" component={Advertiser} />
	    	</Route>
	  	</Router>
	), document.getElementById('app'));
} else {
	ReactDOM.render((
		<Router history={hashHistory}>
			<Route path="/" component={Base}>
				<IndexRoute component={ClientMain} />
	    		<Route path="/main" component={ClientMain} />
	    		<Route path="/detail" component={ClientDetail} />
	    	</Route>
	  	</Router>
	), document.getElementById('app'));
}
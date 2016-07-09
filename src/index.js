import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Base from './components/base/Base';
import About from './components/base/About';
import AgentMain from './components/agent/Main';
import AgentDetail from './components/agent/Detail';
import Advertiser from './components/agent/Advertiser';
import ClientMain from './components/client/Main';
import ClientDetail from './components/client/Detail';

require('es6-promise').polyfill();
import 'whatwg-fetch';
import URLSearchParams from 'url-search-params';

let api = require('./common/config').api;

// 校验登录
(function checkLogin() {
	sinaSSOController.autoLogin(function(status) {
		if (status == null) {
			if (top.location.href.indexOf("login.html") < 0) {
				top.location.href = "/login.html";
			}
		} else {
			// 判断登录平台，如果没有则重新请求。
			let platform;
			let query = location.hash.split('?')[1];
			let u = new URLSearchParams(query);
			platform = u.get('platform');
			if (!platform) {
				fetch(api.login, {
						credentials: 'same-origin'
					})
					.then(function(response) {
						if (response.ok) {
							return response.json();
						}
					}).then(function(json) {
						if (json && json.code == 0) {
							platform = json.result.platform;
							init(platform, status.nick);
						} else {
							alert(json.message.global);
						}
					}).catch(e => {
						console.log(e);
						alert('数据获取失败');
					});
			} else {
				init(platform, status.nick);
			}
		}
	});
})();

// Render the main component into the dom
// 判断代理商还是客户
function init(platform, name) {
	if (platform == "1") {
		ReactDOM.render((
			<Router history={hashHistory}>
				<Route path="/" component={Base}>
				 	<IndexRoute component={AgentMain} />
		    		<Route path="/main" component={AgentMain} />
		    		<Route path="/detail" component={AgentDetail} />
		    		<Route path="/advertiser" component={Advertiser} />
		    		<Route path="/about/:platform" component={() => (<About platform="1"/>)} />
		    	</Route>
		  	</Router>
		), document.getElementById('app'));
	} else {
		ReactDOM.render((
			<Router history={hashHistory}>
				<Route path="/" component={Base}>
					<IndexRoute component={() => (<ClientMain userName={name}/>)} />
		    		<Route path="/main" component={() => (<ClientMain userName={name}/>)} />
		    		<Route path="/detail" component={() => (<ClientDetail userName={name}/>)} />
		    		<Route path="/about/:platform" component={() => (<About platform="0" userName={name}/>)} />
		    	</Route>
		  	</Router>
		), document.getElementById('app'));
	}
}
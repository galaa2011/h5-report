import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
let api = require('./common/config').api;

// Render the main component into the dom
ReactDOM.render(<App source={api.getAgentInfo}/>, document.getElementById('app'));

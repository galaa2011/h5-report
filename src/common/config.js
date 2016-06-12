'use strict';

let baseConfig = {};

let apiConfig = {
	getAgentInfo: 'https://api.github.com/users/octocat/gists'
};

let config = Object.assign({}, baseConfig, {
	api: apiConfig
});

module.exports = config;
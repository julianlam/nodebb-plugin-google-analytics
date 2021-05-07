'use strict';

const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');

const controllers = require('./lib/controllers');

const PLUGIN_NAME = 'google-analytics';
const plugin = {
	settings: {},
};

plugin.init = async function(params) {
	const { middleware, router } = params;
	const routeHelpers = require.main.require('./src/routes/helpers');

	routeHelpers.setupAdminPageRoute(router, `/admin/plugins/${PLUGIN_NAME}`, middleware, [], controllers.renderAdminPage);

	// Load asset ID from config
	await plugin.loadSettings();
};

plugin.filterConfigGet = async function (config) {
	config[PLUGIN_NAME] = plugin.settings;
	return config;
};

plugin.loadSettings = async () => {
	const settings = await meta.settings.get(PLUGIN_NAME);
	if (settings.id || settings.ga4id) {
		settings.useUA = settings.useUA === 'on' || false;
		plugin.settings = settings;
	} else {
		winston.error('A Google Analytics ID (e.g. G-XXXXXXXXXX) was not specified. Please complete setup in the administration panel.');
	}
};

plugin.onConfigChange = async (hash) => {
	if (hash === `settings:${PLUGIN_NAME}`) {
		await plugin.loadSettings();
	}
};

plugin.addAdminNavigation = async (header) => {
	header.plugins.push({
		route: `/plugins/${PLUGIN_NAME}`,
		icon: 'fa-bar-chart-o',
		name: 'Google Analytics'
	});
	return header;
};

plugin.getNotices = async (notices) => {
	notices.push({
		done: plugin.settings.id !== undefined && plugin.settings.id.length > 0,
		doneText: 'Google Analytics OK',
		notDoneText: 'Google Analytics needs setup',
		link: '/admin/plugins/google-analytics',
	});
	return notices;
};

module.exports = plugin;

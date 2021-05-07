'use strict';

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
};

plugin.filterConfigGet = async function (config) {
	config[PLUGIN_NAME] = await meta.settings.get(PLUGIN_NAME);
	return config;
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

'use strict';

const meta = require.main.require('./src/meta');

const Controllers = module.exports;

const PLUGIN_NAME = 'google-analytics';

Controllers.renderAdminPage = async (req, res) => {
	const settings = await meta.settings.get(PLUGIN_NAME);

	res.render(`admin/plugins/${PLUGIN_NAME}`, {
		useUA: settings.useUA === 'on' || false,
	});
};

var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	db = module.parent.require('./database'),

	GA = {};

GA.init = function(app, middleware, controllers) {
	function render(req, res, next) {
		res.render('admin/plugins/google-analytics', {});
	}

	app.get('/admin/plugins/google-analytics', middleware.admin.buildHeader, render);
	app.get('/api/admin/plugins/google-analytics', render);

	Meta.settings.getOne('google-analytics', 'id', function(err, assetId) {
		if (!err && assetId) {
			app.get('/api/plugins/google-analytics', function(req, res) {
				res.send(200, assetId);
			});
		} else {
			winston.error('A Google Analytics ID (e.g. UA-XXXXX-X) was not specified.');
		}
	});
};

GA.loadScript = function(scripts) {
	return scripts.concat([
		'plugins/nodebb-plugin-google-analytics/listener.js'
	]);
};

GA.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/google-analytics',
			"icon": 'fa-bar-chart-o',
			"name": 'Google Analytics'
		});

		callback(null, custom_header);
	}
};

module.exports = GA;

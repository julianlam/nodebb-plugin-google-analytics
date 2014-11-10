var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	db = module.parent.require('./database'),

	GA = {
		settings: {}
	};

GA.init = function(data, callback) {
	function render(req, res, next) {
		res.render('admin/plugins/google-analytics', {});
	}

	data.router.get('/admin/plugins/google-analytics', data.middleware.admin.buildHeader, render);
	data.router.get('/api/admin/plugins/google-analytics', render);
	data.router.get('/api/plugins/google-analytics', function(req, res) {
		if (GA.settings) {
			res.status(200).json(GA.settings);
		} else {
			res.send(501);
		}
	});

	// Load asset ID from config
	GA.loadSettings();

	callback();
};

GA.loadSettings = function() {
	Meta.settings.get('google-analytics', function(err, settings) {
		if (!err && settings.id && settings.id.length) {
			GA.settings = settings;
		} else {
			winston.error('A Google Analytics ID (e.g. UA-XXXXX-X) was not specified. Please complete setup in the administration panel.');
		}
	});
};

GA.onConfigChange = function(hash) {
	if (hash === 'settings:google-analytics') {
		GA.loadSettings();
	}
};

GA.routeMenu = function(custom_header, callback) {
	custom_header.plugins.push({
		"route": '/plugins/google-analytics',
		"icon": 'fa-bar-chart-o',
		"name": 'Google Analytics'
	});

	callback(null, custom_header);
};

GA.getNotices = function(notices, callback) {
	notices.push({
		done: GA.settings.id !== undefined && GA.settings.id.length > 0,
		doneText: 'Google Analytics OK',
		notDoneText: 'Google Analytics needs setup'
	});

	callback(null, notices);
}

module.exports = GA;

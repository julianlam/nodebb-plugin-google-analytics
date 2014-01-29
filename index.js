var	fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),

	db = module.parent.require('./database'),

	GA = {};

GA.init = function(callback) {
	if (GA.serverGA !== undefined) return callback();

	db.getObjectFields('config', ['ga:id', 'ga:domain'], function(err, options) {
		if (!err && options['ga:id']/* && options['ga:domain']*/) {
			GA.id = options['ga:id'];
			// GA.domain = options['ga:domain'];

			callback();
		} else {
			callback(new Error('A Google Analytics ID (e.g. UA-XXXXX-X) was not specified.'));
		}
	});
}

GA.addTrackingScript = function(appendHTML, callback) {
	GA.init(function(err) {
		if (!err) {
			appendHTML += "\
				<script type=\"text/javascript\"> \
					var _gaq = _gaq || []; \
					_gaq.push(['_setAccount', '" + GA.id + "']); \
					_gaq.push(['_trackPageview']); \
					\
					(function() { \
					var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; \
					ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; \
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); \
					})(); \
				</script> \
			";

			callback(err, appendHTML);
		} else {
			winston.error(err.message);
			callback(err, appendHTML);
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

		return custom_header;
	},
	route: function(custom_routes, callback) {
		fs.readFile(path.join(__dirname, 'admin.tpl'), function(err, tpl) {
			custom_routes.routes.push({
				route: '/plugins/google-analytics',
				method: "get",
				options: function(req, res, callback) {
					callback({
						req: req,
						res: res,
						route: '/plugins/google-analytics',
						name: 'Google Analytics',
						content: tpl
					});
				}
			});

			callback(null, custom_routes);
		});
	}
};

module.exports = GA;

var	fs = require('fs'),
	path = require('path'),

	RDB = module.parent.require('./redis'),

	GoogleAnalytics = require('ga'),

	GA = {};

GA.serverGA = undefined;

GA.init = function(callback) {
	if (GA.serverGA !== undefined) return callback();

	RDB.hmget('config', ['ga:id', 'ga:domain'], function(err, options) {
		if (!err && options[0] && options[1]) {
			GA.serverGA = new GoogleAnalytics(options[0], options[1]);
			GA.id = options[0];
			GA.domain = options[1];

			callback();
		} else {
			callback(new Error('invalid-id-or-domain'));
		}
	});
}

GA.addTrackingScript = function(appendHTML, callback) {
	GA.init(function(err) {
		if (!err) {
			appendHTML += "\
				\n\t\t<script>\
					\n\t\t\t(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\
					\n\t\t\t(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\
					\n\t\t\tm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\
					\n\t\t\t})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\
					\n\t\t\tga('create', '" + GA.id + "', '" + GA.domain + "');\
					\n\t\t\tga('send', 'pageview');\
				\n\t\t</script>\n";

			callback(err, appendHTML);
		} else {
			callback(err, appendHTML);
		}
	});
};

GA.recordPageView = function(data) {
	GA.init(function(err) {
		if (!err) {
			GA.serverGA.trackPage(data.url, data.uid);
		}
	});
};

GA.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/google-analytics',
			"icon": 'icon-bar-chart',
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
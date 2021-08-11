$(document).ready(function() {
	const gaConfig = config['google-analytics'];
	if (gaConfig && (gaConfig.id || gaConfig.ga4id)) {
		if ((gaConfig.useUA === undefined && gaConfig.id) || gaConfig.useUA === 'on') {
			// GA Snippet
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', gaConfig.id, 'auto');
			if (gaConfig.displayFeatures === 'on') {
				ga('require', 'displayfeatures');
			}
			ga('send', 'pageview');

			// Page pushing
			$(window).on('action:ajaxify.end', function(ev, data) {
				ga('send', 'pageview', config.relative_path + '/' + data.url);
			});
		}
		else {
			const script = document.createElement('script');
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtag/js?id=${gaConfig.ga4id}`;
			document.querySelector('head').appendChild(script);

			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', gaConfig.ga4id);
		}
	} else {
		if (window.console) {
			console.warn('[plugins/google-analytics] Your Google Analytics Asset ID could not be retrieved. Please double-check that it is set in the plugin\'s settings.');
		}
	}
});

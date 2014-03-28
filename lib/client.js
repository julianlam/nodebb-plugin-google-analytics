$(document).ready(function() {
	$.get(RELATIVE_PATH + '/api/plugins/google-analytics').success(function(assetId) {
		// GA Snippet
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', assetId, 'auto');
		ga('send', 'pageview');

		// Page pushing
		$(window).on('action:ajaxify.end', function(ev, data) {
			ga('send', 'pageview', data.url);
		});
	});
});
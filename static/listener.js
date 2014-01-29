$(document).ready(function() {
	$('body').on('action:ajaxifying', function(ev, data) {
		_gaq.push(['_trackPageview', data.url]); 
	});
});
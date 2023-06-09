'use strict';

/* globals $, define */

define('admin/plugins/google-analytics', ['settings'], function (settings) {
	const PLUGIN_HASH = 'google-analytics';
	const ACP = {};
	let $ga4Con;
	let $uaCon;

	ACP.init = function () {
		settings.load(PLUGIN_HASH, $(`.${PLUGIN_HASH}-settings`));

		$ga4Con = $('#ga4-con');
		$uaCon = $('#ua-con');
		const $useUA = $('#useUA');

		$('#save').on('click', saveSettings);
		$useUA.on('change', toggleUA);

		$(window).on('action:admin.settingsLoaded', function () {
			$useUA.removeAttr('disabled');
		});
	};

	function saveSettings() {
		settings.save(PLUGIN_HASH, $(`.${PLUGIN_HASH}-settings`));
	}

	function toggleUA() {
		$ga4Con.toggle(300);
		$uaCon.toggle(300);
	}

	return ACP;
});
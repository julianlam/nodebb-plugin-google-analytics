<h1><i class="fa fa-bar-chart-o"></i> Google Analytics</h1>

<div class="alert alert-info">
	<p>
		The Google Analytics NodeBB plugin uses Universal Analytics. To begin, create an account <a href="https://www.google.com/analytics/"><strong>here</strong></a>.
	</p>
	<p>
		Once you have an account, paste your tracking ID into the field below, and restart your NodeBB.
	</p>
	<p>
		For more information, please consult the <a href="https://support.google.com/analytics/?hl=en#topic=3544906"><strong>Google Analytics Help Center</strong></a>
	</p>
</div>

<form role="form" class="ga-settings">
	<fieldset>
		<div class="form-group">
			<label for="id">Tracking ID</label>
			<input type="text" class="form-control" id="id" name="id" placeholder="UA-XXXXXXXX-X" />
		</div>
		<div class="checkbox">
			<label id="displayFeatures">
				<input type="checkbox" name="displayFeatures" id="displayFeatures" /> Enable Display Advertising Features (<a href="https://support.google.com/analytics/answer/3450482?hl=en">More Information</a>)
			</label>
		</div>

		<button class="btn btn-lg btn-primary" id="save" type="button">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('google-analytics', $('.ga-settings'));

		$('#save').on('click', function() {
			Settings.save('google-analytics', $('.ga-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'ga-saved',
					title: 'Settings Saved'
				});
			});
		});
	});
</script>
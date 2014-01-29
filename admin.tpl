<h1><i class="fa fa-bar-chart-o"></i> Google Analytics</h1>

<div class="alert alert-info">
	<p>
		The Google Analytics NodeBB plugin uses Universal Analytics. To begin, create an account <a href="https://www.google.com/analytics/"><strong>here</strong></a>.
	</p>
	<p>
		Once you have an account, paste your tracking ID and domain into the two fields below, and restart your NodeBB.
	</p>
	<p>
		For more information, please consult the <a href="https://support.google.com/analytics/?hl=en#topic=3544906"><strong>Google Analytics Help Center</strong></a>
	</p>
</div>

<form role="form">
	<fieldset>
		<div class="form-group">
			<label for="ga:id">Tracking ID</label>
			<input type="text" class="form-control" id="ga:id" data-field="ga:id" placeholder="UA-XXXXXXXX-X" />
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['forum/admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>
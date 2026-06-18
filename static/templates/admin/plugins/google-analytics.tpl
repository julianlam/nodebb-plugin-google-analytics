<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<div class="alert alert-info">
				<p>
					If you don't have a Google Analytics account, you can create one <a href="https://www.google.com/analytics/"><strong>here</strong></a>.
				</p>
				<p>
					Once you have an account, paste your tracking ID into the field below, and restart your NodeBB.
				</p>
				<p>
					For more information, please consult the <a href="https://support.google.com/analytics/?hl=en#topic=9143232"><strong>Google Analytics Help Center</strong></a>
				</p>
			</div>

			<form role="form" class="google-analytics-settings">
				<div class="mb-3">
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" name="useUA" id="useUA" disabled{{{ if useUA }}} checked{{{ end }}}>
						<label class="form-check-label">Use Universal Analytics</label>
					</div>
				</div>

				<fieldset id="ga4-con"{{{ if useUA }}} style="display: none;"{{{ end }}}>
					<div class="mb-3">
						<label class="form-label" for="ga4id">Tracking ID (Google Analytics 4)</label>
						<input type="text" class="form-control" id="ga4id" name="ga4id" placeholder="G-XXXXXXXXXX">
					</div>
				</fieldset>

				<fieldset id="ua-con"{{{ if !useUA }}} style="display: none;"{{{ end }}}>
					<div class="mb-3">
						<label class="form-label" for="id">Tracking ID (Universal Analytics)</label>
						<input type="text" class="form-control" id="id" name="id" placeholder="UA-XXXXXXXX-X">
					</div>
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" name="displayFeatures" id="displayFeatures">
						<label class="form-check-label" for="displayFeatures">
							Enable Display Advertising Features (<a href="https://support.google.com/analytics/answer/3450482?hl=en">More Information</a>)
						</label>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</div>


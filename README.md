# Google Analytics Plugin

This plugin allows you to track visitors to your NodeBB, including getting detailed view rates per topic/category.

## Requirements

This plugin requires NodeBB v0.1.1 or greater, due to hooks added during that revision.

## Installation

1. Create a Google Analytics account ([here](https://www.google.com/analytics)), and create a new app in order to receive a `UA-` number. This is your tracking ID.
1. Install the plugin: `npm install nodebb-plugin-google-analytics`

1. Activate the plugin in the administration panel, and restart your NodeBB
1. Navigate to the Google Analytics settings page `/admin/plugins/google-analytics`, and save your tracking ID and domain, as specified in step 1.
1. Restart your NodeBB, and verify that the tracking code appears at the bottom of the page source.
'use strict';
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
	boolean: ['production'],
	alias: {P: 'production'}
});

const isProduction = args._.includes('-P') || args._.includes('--production');

// Require the Fractal module
const fractal = require('@frctl/fractal').create();

// Give your project a title.
fractal.set('project.title', `ProFI Pattern Library`);
fractal.set('project.titleWithBuildDate', `ProFI Pattern Library<small class="Browser-isEmptyNote"> - Build Date: ${(new Date()).toISOString()}</small>`);

// Tell Fractal where to look for components.
fractal.components.set('path', 'src/pattern-library/components');
fractal.components.set('default.preview', '@preview');
fractal.components.set('profiCSS', isProduction ? 'assets/css/index.min.css' : 'assets/css/index.css');
fractal.components.set('appJS', isProduction ? 'app/app.bundle.min.js' : 'app/app.bundle.js');
fractal.components.set('polyfillsJS', isProduction ? 'app/polyfills.bundle.min.js' : 'app/polyfills.bundle.js');
fractal.components.set('vendorJS', isProduction ? 'app/vendor.bundle.min.js' : 'app/vendor.bundle.js');

fractal.components.set('default.status', 'wip');

// Tell Fractal where to look for documentation pages.
fractal.docs.set('path', 'src/pattern-library/docs');

// Tell the Fractal web preview plugin where to look for static assets.
if (!isProduction) {
	fractal.web.set('static.path', 'server');
}

// Set the static HTML build destination
fractal.web.set('builder.dest', isProduction ? 'dist/pattern-library/' : 'server/pattern-library');

fractal.web.set('server.syncOptions', {
	open: true,
	notify: true
});

/**
 * Configure Theme
 */
const mandelbrot = require('@frctl/mandelbrot'); // Require the Mandelbrot theme module

// create a new instance with custom config options
const profiTheme = mandelbrot({
	skin: 'white', // Choices: 'aqua' | 'black' | 'blue' | 'default' | 'fuchsia' | 'green' | 'grey' | 'lime' | 'maroon' | 'navy' | 'olive' | 'orange' | 'purple' | 'red' | 'teal' | 'white' | 'yellow'
	panels: [
		'html',
		'view',
		'info',
		'notes'
	]
});
profiTheme.addLoadPath('src/pattern-library/theme-overrides/views');

fractal.web.theme(profiTheme); // Tell Fractal to use the configured theme by default

module.exports = fractal;

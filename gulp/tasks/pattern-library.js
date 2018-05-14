const exec = require('child_process').exec;

import {isProdBuild} from '../command-line-args';
import onError from '../on-error';

function patternLibrary(done) {
	if (isProdBuild()) {
		exec(isProdBuild() ? ' npx fractal build -- --production ' : 'npx fractal build', (error, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			if (stderr) {
				done();
				const fractalError = new Error('Error building Fractal');
				fractalError.plugin = 'patternLibrary';
				return onError(fractalError);
			}
			done();
		});
	}
	done();
}

export default patternLibrary;

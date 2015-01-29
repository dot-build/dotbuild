var EventAggregator = require('./EventAggregator');
var karma = require('karma').server;

function ModuleTestRunner(model, config) {
	this.model = model;
	this.config = config;
}

ModuleTestRunner.prototype = {
	constructor: ModuleTestRunner,
	run: runTests
};

function runTests() {
	var self = this,
		config = self.config;

	var files = [
		'*.module.js',
		'**/*.js',
		'**/*.spec.js'
	];

	var additionalTestLibraries = config.get('additionalTestLibraries');

	if (additionalTestLibraries) {
		files = files.concat(additionalTestLibraries);
	}

	files.unshift(config.get('pathToAngularMocks'));
	files.unshift(config.get('pathToAngular'));

	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		files: files
	}, done);

	function done(exitCode) {
		var testsPass = (exitCode === 0),
			eventToEmit = testsPass ? 'test.pass' : 'test.fail';

		EventAggregator.emit(eventToEmit, self.model);
	}
}

module.exports = ModuleTestRunner;

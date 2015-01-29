var assert = require('assert');
var Config = require('Config');
var FileService = require('FileService');

describe('FileService', function() {
	describe('#constructor(Config config)', function() {
		it('should save the config object as `config` property', function() {
			var config = new Config();
			var instance = new FileService(config);

			assert(instance.config === config, 'config was not saved properly');
		});
	});

	// describe('#getScripts(ModuleInfo moduleInfo)', function() {
	// 	it('should return an array of js files inside a module path, excluding specs', function() {

	// 	});
	// });

	// describe('#getStyles(ModuleInfo moduleInfo)', function() {
	// 	it('should return an array of scss files inside a module path', function() {

	// 	});
	// });
});

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

	describe('#getModuleFiles(ModuleInfo moduleInfo)', function() {
		it('should return an array of files inside a module path, without specs', function() {

		});
	});
});

var assert = require('assert');
var Config = require('Config');
var ModuleInfo = require('ModuleInfo');

describe('ModuleInfo', function() {
	var config, moduleInfo;

	beforeEach(function() {
		config = new Config({});

		moduleInfo = {
			name: 'foo',
			requires: ['bar', 'baz']
		};
	});

	describe('#constructor(Config config, Object moduleInfo)', function() {
		it('should not continue without a config object and the module info', function() {
			assert.throws(function() {
				new ModuleInfo(null, moduleInfo);
			}, Error, 'A config object should be required');

			assert.throws(function() {
				new ModuleInfo(config, null);
			}, Error, 'The module info object should be required');
		});
	});

	describe('.config', function() {
		it('should save the configs to `config`', function() {
			var instance = new ModuleInfo(config, moduleInfo);
			assert(instance.config === config);
		});
	});

	describe('.name', function() {
		it('should save the module name to a property `name`', function() {
			var instance = new ModuleInfo(config, moduleInfo);
			assert(instance.name === moduleInfo.name);
		});
	});

	describe('.requires', function() {
		it('should have a list of module names that this module requires', function() {
			var instance = new ModuleInfo(config, moduleInfo);

			assert.deepEqual(instance.requires, moduleInfo.requires, 'module dependencies are not valid');
		});
	});

	describe('.path', function() {
		it('should have the module path on disk', function() {

		});
	});

	describe('#', function() {

	});
});

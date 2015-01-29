var assert = require('assert');
var pquire = require('proxyquire');


describe('ModuleController - provides a top-level API to work with a module', function() {
	describe('#constructor(String modulePath)', function() {
		it('should provide access to module info and module files', function() {

		});
	});

	describe('#test()', function() {
		it('should run karma through the test runner', function() {
			var TestRunner = {};

			var ModuleController = pquire('ModuleController', {
				TestRunner: TestRunner
			});

			var instance = new ModuleController('/path');
			instance.test();


			assert(TestRunner)
		});
	});

	describe('#watch()', function() {
		it('should watch for changes with the file watcher', function() {

		});
	});

	describe('#build', function() {
		it('should put the module files through the assets pipeline', function() {

		});
	});
});

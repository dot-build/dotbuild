var assert = require('assert');
var Config = require('Config');
var proxyquire = require('proxyquire');

describe('Config', function() {
	describe('#constructor(Object config)', function() {
		it('should create a `configs` property set the passed configs', function() {
			var configs = {
				foo: 'bar'
			};

			var instance = new Config(configs);

			assert(typeof instance.configs === 'object', 'config property not set');
			assert(instance.configs.foo === 'bar', 'configs not applied');
		});
	});

	describe('#set(String name, * value)', function() {
		it('should set one property', function() {
			var instance = new Config();

			instance.set('foo', 'foo');

			assert(instance.configs.foo === 'foo', 'single property not set');
		});
	});

	describe('#set(Object configs)', function() {
		it('should set multiple properties at once', function() {
			var configs = {
				foo: 'foo',
				bar: 'bar'
			};

			var instance = new Config();

			instance.set(configs);

			assert(instance.configs.foo === 'foo', 'multi properties not set');
			assert(instance.configs.bar === 'bar', 'multi properties not set');
		});
	});

	describe('#get()', function() {
		it('should get all the configs as an object', function() {
			var configs = {
				foo: 1,
				bar: 2
			};

			var instance = new Config(configs),
				result = instance.get();

			assert(result.foo === configs.foo);
			assert(result.bar === configs.bar);
		});
	});

	describe('#get(String name)', function() {
		it('should return one config by name', function() {
			var config = {
				foo: 'bar'
			};

			var instance = new Config(config);

			assert(instance.get('foo') === 'bar', 'get one value failed');
		});
	});

	describe('#has(String name)', function() {
		it('should check if a value exists in the config', function() {
			var configs = {
				foo: true
			};

			var instance = new Config(configs);
			assert(instance.has('foo') === true);
			assert(instance.has('bar') === false);
		});
	});

	describe('::fromFile(String filepath)', function() {
		it('should load a JSON file and add it to configs', function() {
			var configs = {
				foo: 'foo',
				bar: true,
				'@noCallThru': true
			};

			var stubs = [];
			stubs['config.json'] = configs;

			var Config = proxyquire('../lib/Config', stubs);
			var instance = Config.fromFile('config.json');

			assert(instance.get('foo') === 'foo', 'config "foo" was not imported');
			assert(instance.get('bar') === true, 'config "bar" was not imported');
		});
	});
});

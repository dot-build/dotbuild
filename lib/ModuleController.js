var ModuleModel = require('./ModuleModel');
var TestRunner = require('./ModuleTestRunner');
var FileWatcher = require('./ModuleFileWatcher');
var EventAggregator = require('./EventAggregator');
var fs = require('fs');
var recursiveDir = require('recursive-readdir');
var assert = require('assert');

function ModuleController(name, path, config) {
	assert(name, 'Name required');
	assert(path, 'Module path required');
	assert(typeof config === 'object' && config !== null, 'Config object required');

	this.model = new ModuleModel(name, path);
	this.config = config;
}

function initialize() {
	var self = this;
	var path = this.model.path;

	if (!fs.existsSync(path)) {
		throw new Error('Module path not found: ' + path);
	}

	this.testRunner = new TestRunner(this.model, this.config);
	this.fileWatcher = new FileWatcher(this.model, this.config);

	recursiveDir(path, function(err, files) {
		if (err) return;

		var model = self.model;

		files.forEach(model.addFile.bind(model));
	});
}

ModuleController.prototype = {
	constructor: ModuleController,
	initialize: initialize,
	test: runTests,
	watch: watchForChanges
};

function runTests() {
	this.testRunner.run();
}

function watchForChanges() {
	var watcher = this.fileWatcher;
	var self = this;

	watcher.watch();

	watcher.on('remove', function(path) {
		self.model.removeFile(path);
		EventAggregator.emit('file.remove', path);
	});

	watcher.on('change', function(path) {
		EventAggregator.emit('file.change', path);
	});

	watcher.on('add', function(path) {
		self.model.addFile(path);
		EventAggregator.emit('file.add', path);
	});

	EventAggregator.emit('module.change', self.model);
}

module.exports = ModuleController;

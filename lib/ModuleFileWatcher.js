var inherits = require('util').inherits;
var EventEmitter = require('da-event-emitter');
var Path = require('path');
var Watcher = {
	watch: require('chokidar-minimatch')
};

var defaults = {};

defaults.watchPatterns = ['**/*'];
defaults.excludePatterns = [];
defaults.pollInterval = 100;

function ModuleFileWatcher(model, config) {
	EventEmitter.call(this);

	var patterns = defaults.watchPatterns.map(function(pattern) {
		return Path.join(model.path, pattern);
	});

	var excludes = defaults.excludePatterns.map(function(pattern) {
		var negated = false;

		if (pattern.charAt(0) === '!') {
			negated = true;
			pattern = pattern.slice(1);
		}

		pattern = Path.join(path, pattern);

		if (negated) {
			pattern = '!' + pattern;
		}

		return pattern;
	});

	this.path = path;
	this.patterns = patterns;
	this.exclude = excludes;
}

inherits(ModuleFileWatcher, EventEmitter);

ModuleFileWatcher.prototype.start = startWatching;
ModuleFileWatcher.prototype.stop = stopWatching;

function startWatching() {
	var self = this;
	var options = {
		persistent: true,
		interval: defaults.pollInterval
	};

	// hack to silence the Watcher lib
	var logFn = console.log;
	console.log = function() {};

	var watcher = Watcher.watch(self.patterns, self.exclude.length ? self.exclude : null, options);

	// restore the logging fn
	console.log = logFn;

	function getRelativePath(path) {
		var basePath = self.path + Path.sep;

		return path.replace(basePath, '');
	}

	watcher.on('add', function(path) {
		path = getRelativePath(path);
		self.emit('add', path, self);
	});

	watcher.on('change', function(path) {
		path = getRelativePath(path);
		self.emit('change', path, self);
	});

	watcher.on('unlink', function(path) {
		path = getRelativePath(path);
		self.emit('remove', path, self);
	});

	this.watcher = watcher;
}

function stopWatching() {
	if (!this.watcher) return;

	this.watcher.removeAllListeners();
	this.watcher.close();
}

ModuleFileWatcher.defaults = defaults;

module.exports = ModuleFileWatcher;

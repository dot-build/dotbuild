var assert = require('assert');

function ModuleInfo(config, info) {
	assert(typeof config === 'object' && config !== null, 'Config object required');

	assert(!!info, 'Module info required');
	assert(typeof info === 'object' && info !== null, 'Module info must be an object');

	this.name = info.name;
	this.config = config;
	this.requires = info.requires || [];
}

module.exports = ModuleInfo;

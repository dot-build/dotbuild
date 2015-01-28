var hasOwnProp = {}.hasOwnProperty,
	extend = require('xtend');

Config.prototype = {
	constructor: Config,
	set: setValues,
	get: getValues,
	has: hasValue
};

function Config(configs) {
	this.configs = {};

	if (typeof configs === 'object' && null !== configs) {
		this.set(configs);
	}
}

function hasValue(name) {
	return hasOwnProp.call(this.configs, name);
}

function setValues(name, value) {
	if (typeof name === 'object') {
		this.configs = extend(this.configs, name);
	} else {
		this.configs[name] = value;
	}
}

function getValues() {
	var configs = this.configs;

	if (arguments.length === 0) {
		return configs;
	}

	return configs[arguments[0]];
}

function readFile(file) {
	try {
		var values = require(file);
		return new Config(values);
	} catch (e) {
		console.log(e);
		return null;
	}
}

Config.fromFile = readFile;

module.exports = Config;

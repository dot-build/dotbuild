var hasOwnProp = {}.hasOwnProperty,
	extend = require('xtend');

Store.prototype = {
	constructor: Store,
	set: setValues,
	get: getValues,
	has: hasValue
};

function Store(configs) {
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

module.exports = Store;

var Store = require('./Store');

function Config() {}

Config.prototype = Store.prototype;

function readFile(file) {
	try {
		var values = require(file);
		return new Store(values);
	} catch (e) {
		console.log(e);
		return null;
	}
}

Config.fromFile = readFile;

module.exports = Config;

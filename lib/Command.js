var EventAggregator = require('./EventAggregator');

function Command(name, fn) {
	this.name = name;
	this.fn = fn;
}

Command.prototype = {
	constructor: Command,
	run: runCommand
};

function runCommand() {
	EventAggregator.emit('command.run:before', this.name);
	this.fn.call(null);
	EventAggregator.emit('command.run', this.name);
}


module.exports = Command;

var Mediator = require('Mediator');

function Command(name, fn) {
	this.name = name;
	this.fn = fn;
}

Command.prototype = {
	constructor: Command,
	run: runCommand
};

function runCommand() {
	Mediator.emit('command.run:before', this.name);
	this.fn.call(null);
	Mediator.emit('command.run', this.name);
}


module.exports = Command;

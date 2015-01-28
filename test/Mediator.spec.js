var assert = require('assert');
var Mediator = require('Mediator');

describe('Mediator', function() {
	it('should be an EventEmitter used for global communication through events', function() {
		var foo = false;

		Mediator.on('foo', function() {
			foo = true;
		});

		Mediator.emit('foo');
		Mediator.off('foo');

		assert(foo === true);
	});
});

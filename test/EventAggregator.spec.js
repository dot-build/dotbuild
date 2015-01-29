var assert = require('assert');
var EventAggregator = require('EventAggregator');

describe('EventAggregator', function() {
	it('should be an EventEmitter used for global communication through events', function() {
		var foo = false;

		EventAggregator.on('foo', function() {
			foo = true;
		});

		EventAggregator.emit('foo');
		EventAggregator.off('foo');

		assert(foo === true);
	});
});

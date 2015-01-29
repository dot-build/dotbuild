var assert = require('assert');
var Command = require('Command');
var EventAggregator = require('EventAggregator');

describe('Command', function() {
	describe('#constructor(String name, Function task)', function() {
		it('should save the command name and the task function', function() {
			function noop() {}
			var instance = new Command('foo', noop);
			assert(instance.name === 'foo');
		});
	});

	describe('#run()', function() {
		it('should emit the `command.run:before` hook, run the command and emit the `command.run` hook', function() {
			var commandName = 'test',
				commandExecuted = false,
				preHook, postHook;

			function task() {
				commandExecuted = true;
			}

			var instance = new Command(commandName, task);

			EventAggregator.on('command.run:before', function(commandName) {
				preHook = commandName;
			});

			EventAggregator.on('command.run', function(commandName) {
				postHook = commandName;
			});

			instance.run();

			assert(preHook === commandName, 'before hook not executed');
			assert(commandExecuted === true, 'command not executed');
			assert(postHook === commandName, 'after hook not executed');

			EventAggregator.off('command.beforerun command.run');
		});

		it('should stop if the `command.run:before` hook returns false', function() {
			var commandExecuted = false;

			function task() {
				commandExecuted = true;
			}

			function preHook() {
				return false;
			}

			var command = new Command('test', task);
			EventAggregator.on('command.beforerun', preHook);

			assert(commandExecuted === false, 'pre hook is not canceling the command');
		});
	});
});

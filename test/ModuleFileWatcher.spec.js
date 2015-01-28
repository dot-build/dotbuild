var assert = require('assert');
var ModuleFileWatcher = require('ModuleFileWatcher');
var fs = require('fs');
var touch = require('touch');
var Path = require('path');
var basePathForTests = '/tmp/mfw';

// skipped to speed up tests
describe.skip('ModuleFileWatcher', function() {
	describe('#constructor(String path)', function() {
		it('should save the given path to watch', function() {
			var path = 'some/path';
			var instance = new ModuleFileWatcher(path);
			assert(instance.path === path);
		});
	});

	describe('#start()', function() {
		this.timeout(10000);

		it('should start watching for files and emit add/remove/change events when a change occurs', function(done) {
			var instance = new ModuleFileWatcher(basePathForTests),

				interval = 1000,

				fileToCreate = 'file.js',
				folderToCreate = 'test-folder',
				folderAndFileToCreate = Path.join(folderToCreate, fileToCreate),

				referenceToCheck = [folderAndFileToCreate],

				filesAdded = [],
				filesRemoved = [],
				filesChanged = [];

			instance.on('add', function(file) {
				filesAdded.push(file);
			});

			instance.on('remove', function(file) {
				filesRemoved.push(file);
			});

			instance.on('change', function(file) {
				filesChanged.push(file);
			});

			/**
			 * Touch a file, then write to a file and remove it
			 */
			var fullPath = Path.join(basePathForTests, folderToCreate, fileToCreate),
				dirname = Path.dirname(fullPath),
				step = 1;

			function next() {
				runFileTestStep(step);
				step++;

				if (step < 9) {
					setTimeout(next, interval);
				}
			}

			next();

			function runFileTestStep(step) {
				process.stdout.write('.');

				switch (step) {
					case 1:
						mkdir(basePathForTests);
						break;

					case 2:
						mkdir(dirname);
						instance.start();
						break;

					case 3:
						touch.sync(fullPath);
						break;

					case 4:
						fs.writeFileSync(fullPath, '123');
						break;

					case 5:
						fs.unlinkSync(fullPath);
						break;

					case 6:
						rmdir(dirname);
						break;

					case 7:
						rmdir(basePathForTests);
						break;

					case 8:
						instance.off();
						instance.stop();
						checkResults();
						done();
						break;
				}
			}

			function checkResults() {
				assert.deepEqual(filesAdded, referenceToCheck, 'list of files added is not correct: [' + filesAdded.join(',') + ']');
				assert.deepEqual(filesChanged, referenceToCheck, 'list of files changed is not correct: [' + filesChanged.join(',') + ']');
				assert.deepEqual(filesRemoved, referenceToCheck, 'list of files removed is not correct: [' + filesRemoved.join(',') + ']');
			}
		});
	});
});


function mkdir(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

function rmdir(path) {
	if (fs.existsSync(path)) {
		fs.rmdirSync(path);
	}
}

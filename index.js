var VERSION = require('./package.json').version;
// var hb = require('handbag-require');

// hb.value('DependencyGraph', require('dependency-graph').DepGraph);
// hb.value('VERSION', VERSION);

var exportedClasses = ['Config', 'Command', 'EventAggregator', 'ModuleController', 'ProjectController'];

module.exports = {
	VERSION: VERSION
};

exportedClasses.forEach(function(name) {
	module.exports[name] = require('./lib/' + name);
});

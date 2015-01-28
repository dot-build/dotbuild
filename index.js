var VERSION = require('./package.json').version;
// var hb = require('handbag-require');

// hb.value('DependencyGraph', require('dependency-graph').DepGraph);
// hb.value('VERSION', VERSION);

module.exports = {
	VERSION: VERSION,
	Config: require('./lib/Config'),
	Command: require('./lib/Command'),
	Mediator: require('./lib/Mediator')
};

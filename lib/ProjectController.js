var Path = require('path');
var Store = require('./Store');
var ModuleController = require('./ModuleController');
var DepGraph = require('dependency-graph').DepGraph;

var defaults = {
	sourcePath: 'src',
	vendorPath: 'vendor'
};

function ProjectController(config) {
	this.config = config;
}

function initializeDependencies() {
	var libraries = this.config.get('libraries'),
		dependencies = this.config.get('dependencies'),
		modules = this.config.get('modules'),
		graph = new DepGraph(),

		addNode = graph.addNode.bind(graph);

	if (!libraries['angular'] && libraries['angular-mocks']) {
		throw new Error('angular and angular-mocks libraries not found in the config');
	}

	// load all libraries by name
	Object.keys(libraries).forEach(addNode);

	// add module names as well
	modules.forEach(addNode);

	Object.keys(dependencies).forEach(function(libName) {
		var o = dependencies[libName],
			i, len, depends;

		if (!o.depends) return;

		depends = Array.isArray(o.depends) ? o.depends : [o.depends];

		for (i = 0, len = depends.length; i < len; i++) {
			this.addDependency(libName, depends[i]);
		}
	}, graph);

	this.dependencyGraph = graph;
}

function initializeModules() {
	var self = this,
		store = new Store(),
		config = self.config,

		sourcePath = Path.join(config.get('ROOT_PATH'), config.get('sourcePath') || defaults.sourcePath);

	this.config.get('modules').forEach(function(moduleName) {
		var path = Path.join(sourcePath, moduleName);
		var controller = new ModuleController(moduleName, path, config);
		controller.initialize();
		store.set(moduleName, controller);
	});

	this.moduleStore = store;
}

function initialize() {
	initializeDependencies.call(this);
	initializeModules.call(this);
}

ProjectController.prototype = {
	constructor: ProjectController,
	initialize: initialize
};

module.exports = ProjectController;

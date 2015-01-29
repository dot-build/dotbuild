var Path = require('path');
var DotBuild = require('./');

var rootPath = process.env.ROOT_PATH || process.cwd();

var config = DotBuild.Config.fromFile(path.join(rootPath, 'build.json'));
config.set('ROOT_PATH', rootPath);

var controller = new DotBuild.ProjectController(config);

// controller.initialize();

module.exports = controller;

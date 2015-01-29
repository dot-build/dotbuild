function ModuleModel(name, path) {
	this.name = name;
	this.path = path;
	this.state = ModuleModel.VALID;
	this.files = [];
}

ModuleModel.VALID = 1;
ModuleModel.INVALID = 2;

ModuleModel.prototype = {
	constructor: ModuleModel,

	addFile: function(file) {
		this.files.push(file);
	},

	removeFile: function(path) {
		var position = this.files.indexOf(path);

		if (position === -1) return;

		this.files.splice(position, 1);
	}
};

module.exports = ModuleModel;

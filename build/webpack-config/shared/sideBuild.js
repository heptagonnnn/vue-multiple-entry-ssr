const webpack = require("webpack")
const {addTemplatePlugin} = require("./index");
const getEntryRouter = require("./getEntryRouter");

function sideBuild(config, type) {

	const router = getEntryRouter(config.entry);

	addTemplatePlugin(config, type, router);

	const compiler = webpack(config);


	compiler.run((err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		stats.errors.forEach(err => console.error(err));
		stats.warnings.forEach(err => console.warn(err));
		console.log(type, " bundled");
	})
}

module.exports = sideBuild;
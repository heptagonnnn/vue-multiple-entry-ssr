const fs = require("fs");
const path = require("path");
const {merge} = require("webpack-merge");
const {addTemplatePlugin} = require("./index");
const getEntryRouter = require("./getEntryRouter");
const webpack = require("webpack");
const resolveClientEnv = require("../../shared/resolveClientEnv")

function initWebpackConfig(originConfig, sideType) {
	const customConfigPath = path.join(process.cwd(), "zaft.config.js");
	let config;
	if (fs.existsSync(customConfigPath)) {
		config = merge(originConfig, require(customConfigPath));
	} else {
		config = originConfig;
	}


	// config.plugins("html")
	addTemplatePlugin(config, sideType, getEntryRouter(config.entry));

	// config.plugins("define")
	console.log("define", resolveClientEnv(config.output));
	config.plugins.push(
		new webpack.DefinePlugin(
			resolveClientEnv(config.output)
		),
	)

	return config;
}


module.exports = initWebpackConfig;
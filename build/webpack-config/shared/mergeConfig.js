const fs = require("fs");
const path = require("path");
const {merge} = require("webpack-merge");

function mergeConfig(originConfig) {
	const customConfigPath = path.join(process.cwd(), "zaft.config.js");
	let finalConfig;
	if (fs.existsSync(customConfigPath)) {
		finalConfig = merge(originConfig, require(customConfigPath));
	} else {
		finalConfig = originConfig;
	}

	return finalConfig;
}


module.exports = mergeConfig;
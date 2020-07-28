const {getPageRouter} = require("./webpack-util");
const path = require("path");
const pluginName = "router-creator-plugin";

class RouterCreatorPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync(pluginName, function (compilation, callback) {
			const routerFile = JSON.stringify(getPageRouter());
			compilation.emitAsset("router.json", {
				source() {
					return routerFile;
				},
				size() {
					return routerFile.length
				}
			});
			callback();
		})
	}
}


module.exports = RouterCreatorPlugin;
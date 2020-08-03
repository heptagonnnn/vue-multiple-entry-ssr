const getEntryRouter = require("../../webpack-config/shared/getEntryRouter")
const pluginName = "ZaftRouterGeneratorPlugin";

class ZaftRouterGeneratorPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync(pluginName, function (compilation, callback) {
			const routerFile = JSON.stringify(getEntryRouter(compiler.options.entry));
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


module.exports = ZaftRouterGeneratorPlugin;
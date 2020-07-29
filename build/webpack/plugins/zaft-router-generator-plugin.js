const getEntryRouter = require("../../shared/getEntryRouter")
const pluginName = "ZaftRouterGeneratorPlugin";

class ZaftRouterGeneratorPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync(pluginName, function (compilation, callback) {
			const routerFile = JSON.stringify(getEntryRouter());
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
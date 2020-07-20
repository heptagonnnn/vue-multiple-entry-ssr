const webpack = require("webpack");

const serverConfig = require("./webpack-server.config");
const {addTemplatePlugin} = require("./webpack-util");

function serverBuild(router) {

	addTemplatePlugin("server", serverConfig, router);

	const compiler = webpack(serverConfig);
	compiler.run((err) => {
		if (!err) {
			console.log("server builded");
		}
	})
}


module.exports = serverBuild;
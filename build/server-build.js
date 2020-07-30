const webpack = require("webpack");
const createCompleteConfig = require("./webpack/shared/createCompleteConfig");
const serverConfig = require("./webpack/webpack-server.config");

function serverBuild() {


	const compiler = webpack(createCompleteConfig(serverConfig));
	compiler.run((err) => {
		if (!err) {
			console.log("server builded");
		}
	})
}


module.exports = serverBuild;
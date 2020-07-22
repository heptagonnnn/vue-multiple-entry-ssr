const webpack = require("webpack");

const serverConfig = require("./webpack-server.config");

function serverBuild(router) {


	const compiler = webpack(serverConfig);
	compiler.run((err) => {
		if (!err) {
			console.log("server builded");
		}
	})
}


module.exports = serverBuild;
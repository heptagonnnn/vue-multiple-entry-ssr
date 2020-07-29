const webpack = require("webpack");

const serverConfig = require("./webpack/webpack-server.config");

function serverBuild() {


	const compiler = webpack(serverConfig);
	compiler.run((err) => {
		if (!err) {
			console.log("server builded");
		}
	})
}


module.exports = serverBuild;
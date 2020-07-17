const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
const MFS = require("memory-fs");
const clientConfig = require('./webpack-client.config');
const serverConfig = require('./webpack-server.config');


function prodBuild(router) {

	const clientCompiler = webpack(clientConfig);
	clientCompiler.run((err) => {
		if (!err) {
			console.log("client builded");
		}
	})

	const serverCompiler = webpack(serverConfig);
	serverCompiler.run((err) => {
		if (!err) {
			console.log("server builded");
			router.forEach((route) => {
				route.renderer = route.creator(
					fs.readFileSync(path.join(serverConfig.output.path, `${route.route}/server-bundle.js`), 'utf-8')
				)
			});
			console.log("create renderer success");
		}
	})

}


module.exports = prodBuild;
const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
const clientConfig = require('./webpack-client.config');
const serverConfig = require('./webpack-server.config');
const HTMLPlugin = require("html-webpack-plugin");

function oldProdBuild(router) {

	const plugins = clientConfig.plugins;
	router.forEach(function (entry) {
		console.log(entry.route);
		plugins.push(
			new HTMLPlugin({
				filename: `${entry.route}/index.html`,
				template: `${__dirname}/index.client.template.html`,
				inject: true,
				chunks: ['chunk-vendors', 'chunk-common', entry.route]
			})
		)
	})


	const clientCompiler = webpack(clientConfig);
	clientCompiler.run((err) => {
		if (!err) {
			console.log("client builded");
		}
	})

	// const serverCompiler = webpack(serverConfig);
	// serverCompiler.run((err) => {
	// 	if (!err) {
	// 		console.log("server builded");
	// 		router.forEach((route) => {
	// 			route.renderer = route.creator(
	// 				fs.readFileSync(path.join(serverConfig.output.path, `${route.route}/server-bundle.js`), 'utf-8')
	// 			)
	// 		});
	// 		console.log("create renderer success");
	// 	}
	// })

}


module.exports = oldProdBuild;
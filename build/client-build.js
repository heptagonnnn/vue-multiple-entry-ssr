const webpack = require('webpack');
const clientConfig = require('./webpack-client.config');
const {addTemplatePlugin} = require("./webpack-util");


function clientBuild(router) {


	addTemplatePlugin(clientConfig, router);

	const clientCompiler = webpack(clientConfig);


	clientCompiler.run((err) => {
		if (!err) {
			console.log("client builded");
		}
	})
}

module.exports = clientBuild;
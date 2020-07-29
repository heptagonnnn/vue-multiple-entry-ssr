const webpack = require('webpack');
const clientConfig = require('./webpack/webpack-client.config');
const {addTemplatePlugin} = require("./webpack/shared");


function clientBuild(router) {


	addTemplatePlugin("client", clientConfig, router);
	addTemplatePlugin("server", clientConfig, router);

	const clientCompiler = webpack(clientConfig);


	clientCompiler.run((err) => {
		if (!err) {
			console.log("client builded");
		}
	})
}

module.exports = clientBuild;
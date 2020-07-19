const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");

const {addTemplatePlugin} = require("./webpack-util");

const clientConfig = require('./webpack-client.config')


function clientDev(router) {

	addTemplatePlugin(clientConfig, router);

	clientConfig.output.filename = 'dist/[name]/[name].js';
	clientConfig.mode = "development";

	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
	)
	// 获取webpack compiler对象
	const clientCompiler = webpack(clientConfig);

	new WebpackDevServer(clientCompiler).listen(8080, "localhost", () => {
		"dev server started"
	})
}


module.exports = clientDev;
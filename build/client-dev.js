const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackDevServer = require("webpack-dev-server");

const {addTemplatePlugin} = require("./webpack-util");

const clientConfig = require('./webpack-client.config')


function clientDev(router) {

	addTemplatePlugin("client", lientConfig, router);

	clientConfig.mode = "development";

	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
	)
	// 获取webpack compiler对象
	const clientCompiler = webpack(clientConfig);

	new WebpackDevServer(clientCompiler, {
		historyApiFallback: {
			rewrites: [
				{from: /^\/history-route\/.*$/, to: '/history-route/index.html'},
			]
		}
	}).listen(8880, "localhost", () => {
		"dev server started"
	})
}


module.exports = clientDev;
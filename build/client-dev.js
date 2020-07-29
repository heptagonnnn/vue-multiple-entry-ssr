const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server");

const {addTemplatePlugin} = require("./webpack/shared");

const clientConfig = require('./webpack/webpack-client.config')


function createDevServerRewrites(router) {
	const rewrites = [];
	router.forEach(({config, route}) => {
		if (config.route === "history") {
			rewrites.push({
				from: new RegExp("^\\/history-route\\/.*$"),
				to: `/${route}.html`
			});
		}
	})
	return rewrites
}

function clientDev(router) {

	addTemplatePlugin("client", clientConfig, router);

	clientConfig.mode = "development";

	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
	)
	// 获取webpack compiler对象
	const clientCompiler = webpack(clientConfig);

	new WebpackDevServer(clientCompiler, {
		historyApiFallback: {
			rewrites: createDevServerRewrites(router)
		}
	}).listen(3000, "localhost", () => {
		"dev server started"
	})
}


module.exports = clientDev;
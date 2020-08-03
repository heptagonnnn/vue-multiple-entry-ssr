const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server");

const getEntryRouter = require("./webpack-config/shared/getEntryRouter");
const clientConfig = require('./webpack-config/webpack-client.config')
const initWebpackConfig = require("./webpack-config/shared/initWebpackConfig");

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

function clientDev(port) {


	const config = initWebpackConfig(clientConfig);
	const router = getEntryRouter(config.entry);


	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
	)


	// 获取webpack compiler对象
	const clientCompiler = webpack(config);

	new WebpackDevServer(clientCompiler, {
		historyApiFallback: {
			rewrites: createDevServerRewrites(router)
		}
	}).listen(port, "localhost", () => {
	})
}


module.exports = clientDev;
const path = require('path')
const webpack = require('webpack')

// 将文件存进内存
const MFS = require('memory-fs')
const HTMLPlugin = require("html-webpack-plugin");
const clientConfig = require('./webpack-client.config')
const serverConfig = require('./webpack-server.config')


function setupHotModule(app, router) {

	// 热加载 浏览器端多入口
	const plugins = clientConfig.plugins;
	router.forEach(function (entry) {
		plugins.push(
			new HTMLPlugin({
				filename: `${entry.route}/index.html`,
				template: `${__dirname}/index.client.template.html`,
				inject: true,
				chunks: ['chunk-vendors', 'chunk-common', entry.route]
			})
		)
	})

	Object.keys(clientConfig.entry).forEach(function (name) {
		clientConfig.entry[name] = ['webpack-hot-middleware/client'].concat(clientConfig.entry[name])
	})

	clientConfig.output.filename = 'dist/[name]/[name].js';
	clientConfig.mode = "development";
	clientConfig.plugins.push(
		// 热加载插件
		new webpack.HotModuleReplacementPlugin(),
	);

	// 获取webpack compiler对象
	const clientCompiler = webpack(clientConfig);
	// dev-middleware可以利用内存进行热更新   https://www.jianshu.com/p/1a7653ced053
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	})

	app.use(devMiddleware);
	clientCompiler.plugin('done', () => {
		console.log("client update");
	});

	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs;
	clientConfig.mode = "development";
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
		stats.warnings.forEach(err => console.warn(err))
		console.log("Server update");
		router.forEach((route) => {
			route.renderer = route.creator(
				mfs.readFileSync(path.join(serverConfig.output.path, `${route.route}/server-bundle.js`), 'utf-8')
			)
			console.log("after creator renderer");
		})
	})
}


module.exports = setupHotModule;
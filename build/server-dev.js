const path = require('path')
const webpack = require('webpack')

// 将文件存进内存
const MFS = require('memory-fs')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const fs = require("fs");
const {createBundleRenderer} = require("vue-server-renderer");
const express = require("express");
const app = express();
const resolve = dir => require('path').resolve(__dirname, dir);


const clientConfig = require('./webpack-client.config')
const serverConfig = require('./webpack-server.config')


function serverDev(router) {

	// 热加载 浏览器端多入口
	Object.keys(clientConfig.entry).forEach(function (name) {
		clientConfig.entry[name] = ['webpack-hot-middleware/client'].concat(clientConfig.entry[name])
	})

	clientConfig.mode = "development";
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
	);

	// 获取webpack compiler对象
	const clientCompiler = webpack(clientConfig);
	// dev-middleware可以利用内存进行热更新   https://www.jianshu.com/p/1a7653ced053
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		stats: {
			colors: true,
			chunks: false
		}
	})

	app.use(devMiddleware);
	clientCompiler.plugin('done', () => {
		console.log("client update");
	});


	// 服务端监听
	serverConfig.mode = "development";
	const serverCompiler = webpack(serverConfig);
	const mfs = new MFS();
	serverCompiler.outputFileSystem = mfs;


	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
		stats.warnings.forEach(err => console.warn(err))
		console.log("Server update");
		router.forEach((route) => {
			route.creator = function (bundle) {
				if (route.config.route === "hash") {
					return {
						renderToString(context) {
							return new Promise((resolve, reject) => {
								const data = mfs.readFileSync(path.join(serverConfig.output.path, "..", "..", route.route, "index.html"), 'utf-8');
								resolve(data);
							})
						}
					}
				} else {
					return createBundleRenderer(bundle, {
						runInNewContext: true,
						template: mfs.readFileSync(path.join(serverConfig.output.path, "..", "..", route.route, "index-server.html"), 'utf-8')
					});
				}
			}
		});
		router.forEach((route) => {
			route.renderer = route.creator(
				mfs.readFileSync(path.join(serverConfig.output.path, `${route.route}-vue-ssr-server-bundle.json`), 'utf-8')
			)
			console.log("after creator renderer");
		})
	});


	router.forEach(route => {

		app.get(`/${route.route}*`, async (req, res) => {
			const context = {
				title: 'ssr test',
				url: req.url,
				baseRoute: route.route
			}
			if (!route.renderer) {
				return res.send('waiting for compilation... refresh in a moment.')
			}
			const html = await route.renderer.renderToString(context);
			res.send(html);

		})
	});


	app.listen(8080);
}


module.exports = serverDev;
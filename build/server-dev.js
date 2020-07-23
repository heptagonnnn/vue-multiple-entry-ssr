const path = require('path')
const webpack = require('webpack')

// 将文件存进内存
const MFS = require('memory-fs')

const {createBundleRenderer} = require("vue-server-renderer");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const {addTemplatePlugin} = require("./webpack-util");

const clientConfig = require('./webpack-client.config')
const serverConfig = require('./webpack-server.config')


app.use(cookieParser());

function serverDev(router) {
	const mfs = new MFS();

	app.get("/static/*", function(req, res) {
		res.send(mfs.readFileSync(path.join(clientConfig.output.path, ...req.url.split("/"))));
	});

	addTemplatePlugin("client", clientConfig, router);
	addTemplatePlugin("server", clientConfig, router);
	clientConfig.mode = "development";

	const clientCompiler = webpack(clientConfig);

	clientCompiler.outputFileSystem = mfs;


	clientCompiler.watch({}, () => {
		console.log("Client update");
	})


	// 服务端监听
	serverConfig.mode = "development";
	const serverCompiler = webpack(serverConfig);
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
				JSON.parse(mfs.readFileSync(path.join(serverConfig.output.path, `${route.route}-vue-ssr-server-bundle.json`), 'utf-8'))
			)
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


	app.use("/node-api/*", function (req, res) {
		res.json({code: 0, init: "???"})
	})

	app.listen(8080);
}


module.exports = serverDev;
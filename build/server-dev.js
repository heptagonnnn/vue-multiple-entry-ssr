const path = require('path')
const webpack = require('webpack')
const os = require("os");
// 将文件存进内存
const MFS = require('memory-fs')
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const {addTemplatePlugin, createTemplateRenderer} = require("./webpack-util");

const clientConfig = require('./webpack-client.config');
const serverConfig = require('./webpack-server.config');

const isProd = process.env.NODE_ENV === "production";


app.use(cookieParser());

function serverDev(router) {
	const mfs = new MFS();

	app.get("/static/*", function (req, res) {
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
			route.clientRenderer = createTemplateRenderer({
				type: "client",
				fs: mfs,
				template: path.join(serverConfig.output.path, route.route, "index.html")
			})
			if (route.config.route === "hash") {
				route.rendere = route.clientRenderer;
			} else {
				route.renderer = createTemplateRenderer({
					bundle: JSON.parse(mfs.readFileSync(path.join(serverConfig.output.path, "static", "js", `${route.route}-vue-ssr-server-bundle.json`), 'utf-8')),
					type: "server",
					fs: mfs,
					template: path.join(serverConfig.output.path, route.route, "index-server.html"),
					options: {
						runInNewContext: false
					}
				});
			}

		});
	});


	router.forEach(route => {
		app.get(`/${route.route}*`, async (req, res) => {

			const context = {
				title: 'ssr test',
				url: req.url,
				baseRoute: route.route
			}

			const memoryUsage = os.freemem() / os.totalmem();
			console.log("memoryUsage", memoryUsage);
			if (memoryUsage < 1 && isProd) {

				res.send(await route.clientRenderer.renderToString(context));
				return;
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
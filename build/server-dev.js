const webpack = require('webpack');
const MFS = require('memory-fs');
const path = require("path");

const Koa = require("koa");
const app = new Koa();
const _Router = require("@koa/router");
const koaBody = require("koa-body");
const koaCookie = require("./middleware/koa-cookie");
const {getProxyRouter, getRenderRouter} = require("./middleware/router");


const clientConfig = require('./webpack-config/webpack-client.config');
const serverConfig = require('./webpack-config/webpack-server.config');
const getEntryRouter = require("./webpack-config/shared/getEntryRouter");
const initWebpackConfig = require("./webpack-config/shared/initWebpackConfig");

const generateRouterRenderer = require("./shared/generateRouterRenderer");


function serverDev(port) {


	const _clientConfig = initWebpackConfig(clientConfig, "client");
	const clientCompiler = webpack(_clientConfig);

	const _serverConfig = initWebpackConfig(serverConfig, "server");
	const serverCompiler = webpack(_serverConfig);


	const router = getEntryRouter(_serverConfig.entry);


	const mfs = new MFS();
	clientCompiler.outputFileSystem = mfs;
	serverCompiler.outputFileSystem = mfs;


	clientCompiler.watch({}, () => {
		console.log("Client update");
	});

	// 服务端监听
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		stats.errors.forEach(err => console.error(err));
		stats.warnings.forEach(err => console.warn(err));
		console.log("Server update");
		generateRouterRenderer(router, serverConfig.output.path, mfs);

	});


	app.use(koaBody());
	app.use(koaCookie());

	const [proxyRouter, renderRouter] = [getProxyRouter(), getRenderRouter(router)];

	app.use(proxyRouter.routes(), proxyRouter.allowedMethods());
	app.use(renderRouter.routes(), renderRouter.allowedMethods());

	const staticRouter = new _Router();
	staticRouter.get("/static/:path*", (ctx) => {
		ctx.body = mfs.readFileSync(path.join(clientConfig.output.path, ...ctx.url.split("/")));
	});
	app.use(staticRouter.routes());


	app.listen(port);

}


module.exports = serverDev;
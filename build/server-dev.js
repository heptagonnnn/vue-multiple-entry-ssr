const webpack = require('webpack');
const MFS = require('memory-fs');
const path = require("path");

const Koa = require("koa");
const app = new Koa();
const _Router = require("@koa/router");
const koaBody = require("koa-body");
const koaCookie = require("./middleware/koa-cookie");
const {getProxyRouter, getRenderRouter} = require("./middleware/router");


const {addTemplatePlugin} = require("./webpack/shared");
const clientConfig = require('./webpack/webpack-client.config');
const serverConfig = require('./webpack/webpack-server.config');


const generateRouterRenderer = require("./shared/generateRouterRenderer");




function serverDev(router) {

	const mfs = new MFS();

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


	app.listen(3000);

}


module.exports = serverDev;
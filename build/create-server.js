const fs = require("fs");
const Koa = require("koa");
const koaStatic = require("koa-static");
const koaBody = require("koa-body");
const koaCookie = require("./middleware/koa-cookie");


const generateRouterRender = require("./shared/generateRouterRenderer");
const {getProxyRouter, getRenderRouter, getMonitorRouter} = require("./middleware/router");

function createServer(router, staticSourcePath) {
	const app = new Koa();

	app.use(koaBody());
	app.use(koaCookie());


	generateRouterRender(router, staticSourcePath, fs);


	const [proxyRouter, renderRouter, monitorRouter] = [getProxyRouter(), getRenderRouter(router), getMonitorRouter()];


	app.use(proxyRouter.routes(), proxyRouter.allowedMethods());
	app.use(renderRouter.routes(), renderRouter.allowedMethods());
	app.use(monitorRouter.routes(), monitorRouter.allowedMethods());

	app.use(koaStatic(process.cwd()));
	return app;
}

module.exports = createServer;
const _Router = require("@koa/router");


function getMonitorRouter() {
	const koaRouter = new _Router();
	koaRouter.get("/monitor/ping", async (ctx, next) => {
		ctx.body = "";
		await next();
	});

	return koaRouter;
}


module.exports = getMonitorRouter;

const _Router = require("@koa/router");


function getProxyRouter() {
	const koaRouter = new _Router();
	koaRouter.all("/node-api/:other*", async (ctx, next) => {
		ctx.body = {
			code: 0,
			proxy: true
		}
		await next();
	})
	return koaRouter;
}


module.exports = getProxyRouter;
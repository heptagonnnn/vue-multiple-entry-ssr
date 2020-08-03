const path = require("path");
const _Router = require("@koa/router");


const isProd = require("../../shared").isProd();

function getRenderRouter(router) {
	const koaRouter = new _Router();
	router.forEach(route => {

		koaRouter.get(path.join("/", route.route), async (ctx) => {
			const context = {
				title: 'ssr test',
				url: ctx.url,
				cookie: ctx.cookie,
				cookieRaw: ctx.headers.cookie
			};


			try {
				if (!route.renderer) {
					ctx.body = "not ready";
					await next();
				} else {

					await Promise.race([
						new Promise((resolve, reject) => {
							setTimeout(() => {
								reject(new Error("render timeout"));
							}, process.env.ZAFT_RENDER_TIMEOUT);
						}), new Promise(async (resolve, reject) => {
							// 此处使用硬编码 计算合适的内存使用率阈值
							const {rss} = process.memoryUsage();

							if (rss / 1024 / 1024 > 190 && isProd) {
								reject(new Error(`high server memory usage ${new Date()}`));
							}
							ctx.body = await route.renderer.renderToString(context);
							resolve();
						})]);
				}
			} catch (err) {

				console.log("client render guarantee: ", err.message);
				ctx.body = await route.clientRenderer.renderToString(context);
			}

		});
	});

	return koaRouter;
}


module.exports = getRenderRouter;
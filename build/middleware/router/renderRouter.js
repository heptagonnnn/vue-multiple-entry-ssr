const _Router = require("@koa/router");


function getRenderRouter(router) {
	const koaRouter = new _Router();
	router.forEach(route => {

		koaRouter.get(`/${route.route}`, async (ctx) => {
			const context = {
				title: 'ssr test',
				url: ctx.url,
				cookie: ctx.cookie,
				cookieRaw: ctx.headers.cookie
			};


			try {
				if (!route.renderer) {

				}

				await Promise.race([
					new Promise((resolve, reject) => {
						setTimeout(() => {
							reject(new Error("render timeout"));
						}, 800);
					}), new Promise(async (resolve, reject) => {
						// 此处使用硬编码 计算合适的内存使用率阈值
						const {rss} = process.memoryUsage();

						if (rss / 1024 / 1024 > 190) {
							reject(new Error(`high server memory usage ${new Date()}`));
						}

						ctx.body = await route.renderer.renderToString(context);
						resolve();
					})])
			} catch (err) {
				console.log("client render guarantee: ", err.message);
				ctx.body = await route.clientRenderer.renderToString(context);
			}

		});
	});

	return koaRouter;
}


module.exports = getRenderRouter;
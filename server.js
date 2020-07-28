const fs = require("fs");
const path = require("path");
const os = require("os");
const express = require("express");
const app = express();
const {createTemplateRenderer} = require("./build/webpack-util");

// 获取路由
const router = JSON.parse(fs.readFileSync("./router.json", "utf-8"));

// renderer
router.forEach((route) => {
	route.clientRenderer = createTemplateRenderer({
		type: "client",
		fs,
		template: path.join(route.route, "index.html")
	})
	if (route.config.route === "hash") {
		route.renderer = route.clientRenderer;
	} else {
		route.renderer = createTemplateRenderer({
			bundle: JSON.parse(fs.readFileSync(path.join("static", "js", `${route.route}-vue-ssr-server-bundle.json`), 'utf-8')),
			type: "server",
			fs,
			template: path.join(route.route, "index-server.html"),
			options: {
				runInNewContext: false
			}
		});
	}

});


// 分配express 路由

router.forEach(route => {

	app.get(`/${route.route}*`, async (req, res) => {
		const context = {
			title: 'ssr test',
			url: req.url,
			baseRoute: route.route
		};
		if (!route.renderer) {
			return res.send('waiting for compilation... refresh in a moment.');
		}
		const memoryUsage = 1 - (os.freemem() / os.totalmem());
		console.log(Date.now(), "memoryUsage", memoryUsage, os.freemem(), os.totalmem());
		console.log(Date.now(), "process.memoryUseage", process.memoryUsage());
		if (memoryUsage > 0.8) {
			console.log("in base case");
			res.send(await route.clientRenderer.renderToString(context));
			return;
		}
		const html = await route.renderer.renderToString(context);
		res.send(html);
	});
});

app.use("/node-api/*", function (req, res) {
	res.json({code: 0, init: "???"});
});

app.use("/monitor/ping", function (req, res) {
	res.send("");
})

app.use(express.static(process.cwd()));
app.listen(3000);


const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const {createBundleRenderer} = require("vue-server-renderer");
const {getPageRouter} = require("./build/webpack-util");
const resolve = dir => require('path').resolve(__dirname, dir);

const serverDev = require("./build/server-dev");
const router = getPageRouter();


app.use(cookieParser());

// 2.根据路由模式匹配渲染器
router.forEach((route) => {
	route.creator = function (bundle) {
		if (route.config.route === "hash") {
			return {
				renderToString(context) {
					return new Promise((resolve, reject) => {
						fs.readFile(path.join("dist", route.route, "index.html"), function (err, data) {
							if (err) {
								reject(err);
							} else {
								resolve(data.toString());
							}
						});
					})
				}
			}
		} else {
			return createBundleRenderer(bundle, {
				runInNewContext: true,
				template: fs.readFileSync(path.join("dist", route.route, "index-server.html"), "utf8"),
			});
		}
	}
});


const type = process.argv[2];
if (type === "server") {
	serverDev(app, router);
} else {
	router.forEach((route) => {
		route.renderer = route.creator(require(`./dist/static/js/${route.route}-vue-ssr-server-bundle.json`));

	})
	app.use(express.static(resolve('./dist'), {index: false}));
}
router.forEach(route => {

	let needMatch = route.config.route === "history";
	app.get(`/${route.route}*`, async (req, res) => {
		const context = {
			title: 'ssr test',
			url: req.url,
			baseRoute: route.route,
			cookie: req.cookies,
			cookieRaw: req.headers.cookie
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


app.listen(8080)
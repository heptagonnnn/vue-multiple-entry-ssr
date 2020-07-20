const path = require("path");
const fs = require("fs");
const {createBundleRenderer} = require("vue-server-renderer");
const express = require("express");
const app = express();
const {getPageRouter} = require("./build/webpack-util");
const resolve = dir => require('path').resolve(__dirname, dir);

const serverDev = require("./build/server-dev");
const router = getPageRouter();


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
				runInNewContext: false,
				template: fs.readFileSync(path.join("dist", route.route, "index.html"), "utf8"),
			});
		}
	}
});


const type = process.argv[2];
if (type === "server") {
	serverDev(app, router);
} else {
	router.forEach((route) => {
		route.renderer = route.creator(fs.readFileSync(path.join("dist", route.route, "server-bundle.js"), "utf-8"));
	})
	app.use(express.static(resolve('./dist'), {index: false}));
}

router.forEach(route => {

	let needMatch = route.config.route === "history";

	app.get(`/${route.route}${needMatch ? "/*" : ""}`, async (req, res) => {
		const context = {
			title: 'ssr test',
			url: req.url
		}
		if (!route.renderer) {
			return res.send('waiting for compilation... refresh in a moment.')
		}
		const html = await route.renderer.renderToString(context);
		res.send(html);

	})
});


app.listen(8080)
const isProd = process.env.NODE_ENV === "production";
const resolve = dir => require('path').resolve(__dirname, dir);
const fs = require("fs");
const glob = require("glob");
const app = require("express")()
const {createBundleRenderer} = require("vue-server-renderer");

const productionBuild = require("./prod-build");
const setupHotModule = require("./dev-hot");


// 1. 路由嗅探
let router = glob.sync("./src/pages/**/entry-client.js").map((entry) => {
	entry = entry.split("/");
	entry.splice(0, 3);
	entry.pop();
	return {route: `${entry.join("/").toLowerCase()}`};
});


router.forEach((route) => {
	route.creator = function (bundle) {
		return createBundleRenderer(bundle, {
			runInNewContext: false,
			template: fs.readFileSync(resolve("./src/index.template.html"), "utf8")
		});
	}
})
//
// // 不同环境打包
if (isProd) {
	productionBuild(router);
} else {
	setupHotModule(app, router);
}


// // 路由监听

router.forEach(route => {
	app.get(`/${route.route}`, async (req, res) => {
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

app.listen(8888, () => {
	console.log("server started at ", 8888);
})

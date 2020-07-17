// 获取⽂件路径
const resolve = dir => require('path').resolve(__dirname, dir);
const fs = require("fs");
const glob = require('glob');
const path = require("path");
const app = require("express")()
const express = require("express");

const setupHotModule = require("./dev-hot");

// 第 1 步：开放dist/client⽬录，关闭默认下载index⻚的选项，不然到不了后⾯路由
app.use(express.static(resolve('./dist'), {index: false}))
// 第 2 步：获得⼀个createBundleRenderer
const {createBundleRenderer} = require("vue-server-renderer");
// // 第 3 步：服务端打包⽂件地址
// const bundle = resolve("./dist/vue-ssr-server-bundle.json");
// console.log("bundle", bundle);
// // 第 4 步：创建渲染器
// const renderer = createBundleRenderer(bundle, {
// 	runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
// 	template: require('fs').readFileSync(resolve("./src/index.template.html"), "utf8"), // 宿主⽂件
// 	clientManifest: require(resolve("./dist/vue-ssr-client-manifest.json")) // 客户端清单
// });


// 第3步：获取所有路由地址
const routeMap = {};
fs.readdirSync("./dist").forEach(route => {
	if (route === "parent") {
		route = "parent/child";
		const clientBundle = resolve(`./dist/${route}/client-bundle.js`);
		const serverBundle = resolve(`./dist/${route}/server-bundle.js`);
		route = route.toLowerCase();
		const creator = function () {
			createBundleRenderer(serverBundle, {
				runInNewContext: false,
				template: fs.readFileSync(resolve("./src/index.template.html"), "utf8")
			})
		}
		routeMap[route] = {
			creator,
			renderer: creator(serverBundle)
		}
	} else {
		const clientBundle = resolve(`./dist/${route}/client-bundle.js`);
		const serverBundle = resolve(`./dist/${route}/server-bundle.js`);
		route = route.toLowerCase();
		const creator = function (serverBundle) {
			return createBundleRenderer(serverBundle, {
				runInNewContext: false,
				template: fs.readFileSync(resolve("./src/index.template.html"), "utf8")
			})
		}
		routeMap[route] = {
			creator,
			renderer: creator(serverBundle)
		}
	}
})


// 环境判断
if (process.env.NODE_ENV === "production") {
// 生产打包环境
} else {
// 开发热加载环境
	setupHotModule(app, routeMap);
}

console.log(routeMap);
app.get('*', async (req, res) => {
	console.log(req.url);
	// 设置url和title两个重要参数
	const context = {
		title: 'ssr test',
		url: req.url
	}
	if (~req.url.indexOf("bar")) {
		const html = await routeMap.bar.renderer.renderToString(context)
		console.log("html", html);
		res.send(html);
	} else if (~req.url.indexOf("foo")) {
		const html = await routeMap.foo.renderer.renderToString(context)
		res.send(html);
	} else if (~req.url.indexOf('parent')) {
		const html = await routeMap["parent/child"].renderer.renderToString(context)
		res.send(html);
	}
})

app.listen(8000);
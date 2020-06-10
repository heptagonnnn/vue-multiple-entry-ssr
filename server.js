// 获取⽂件路径
const resolve = dir => require('path').resolve(__dirname, dir);
const app = require("express")()
const express = require("express");
// 第 1 步：开放dist/client⽬录，关闭默认下载index⻚的选项，不然到不了后⾯路由
app.use(express.static(resolve('./dist'), {index: false}))
// 第 2 步：获得⼀个createBundleRenderer
const {createBundleRenderer} = require("vue-server-renderer");
// 第 3 步：服务端打包⽂件地址
const bundle = resolve("./dist/vue-ssr-server-bundle.json");
// 第 4 步：创建渲染器
const renderer = createBundleRenderer(bundle, {
	runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
	template: require('fs').readFileSync(resolve("./src/index.template.html"), "utf8"), // 宿主⽂件
	clientManifest: require(resolve("./dist/vue-ssr-client-manifest.json")) // 客户端清单
});
app.get('*', async (req, res) => {
	// 设置url和title两个重要参数
	const context = {
		title: 'ssr test',
		url: req.url,
		state: {
			a: 1,
			b: 2
		}
	}
	const html = await renderer.renderToString(context);
	res.send(html)
})

app.listen(8000);
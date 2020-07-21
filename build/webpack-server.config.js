const path = require("path");
const {getEntry} = require("./webpack-util");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	mode: "development",
	// 将 entry 指向应用程序的 server entry 文件
	entry: {
		...getEntry('./src/pages/**/entry-server.js')
	},
	// 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
	// 并且还会在编译 Vue 组件时，
	// 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
	target: 'node',

	// 对 bundle renderer 提供 source map 支持
	devtool: 'source-map',

	// 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
	output: {
		publicPath: "http://localhost:8080/dist/static/js",
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, "..", 'dist', "static", "js"),
		filename: "[name]-server-bundle.js",
		chunkFilename: "[name]-[chunkhash]-server-bundle.js"
	},
	module: {
		rules: [
			// ... 忽略其它规则

			// 普通的 `.scss` 文件和 `*.vue` 文件中的
			// `<style lang="scss">` 块都应用它
			{
				test: /\.vue$/,
				loader: "vue-loader"
			}
		]
	},
	// 这是将服务器的整个输出
	// 构建为单个 JSON 文件的插件。
	// 默认文件名为 `vue-ssr-server-bundle.json`
	plugins: [
		new VueLoaderPlugin(),
	]
}
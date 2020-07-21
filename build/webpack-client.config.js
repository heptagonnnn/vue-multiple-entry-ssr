const {getEntry} = require("./webpack-util");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");
module.exports = {
	mode: "development",
	entry: {
		...getEntry('./src/pages/**/entry-client.js')
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "..", "dist"),
		filename: "static/js/[name]-[hash].js",
		chunkFilename: 'static/js/[chunkHash].js',
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
		]
	},
	optimization: {},
	plugins: [
		// 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
		// 以便可以在之后正确注入异步 chunk。
		// 这也为你的 应用程序/vendor 代码提供了更好的缓存。
		// 此插件在输出目录中
		// 生成 `vue-ssr-client-manifest.json`。
		// new VueSSRClientPlugin(),
		new VueLoaderPlugin(),
	]
}
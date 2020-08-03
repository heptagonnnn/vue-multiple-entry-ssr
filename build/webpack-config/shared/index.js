const path = require("path");
const glob = require('glob');
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolveClientEnv = require("../../shared/resolveClientEnv");

function addTemplatePlugin(config, type, router) {

	router.forEach(function (entry) {
		const template = fs.existsSync(entry.template)
			? entry.template
			: fs.existsSync(path.join(process.cwd(), "public", "index.html"))
				? path.join(process.cwd(), "public", "index.html")
				: path.join(__dirname, "..", "..", "index.template.html");
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: `${entry.route}/index${type === "server" ? "-server" : ""}.html`,
				template,
				inject: true,
				chunks: ['chunk-vendors', 'chunk-common', entry.chunkPrefix],
				minify: { //压缩HTML文件
					removeComments: false,    //移除HTML中的注释
					collapseWhitespace: true    //删除空白符与换行符
				},
				templateParameters: (compilation, assets, assetTags, options) => {
					return Object.assign({
						compilation,
						webpackConfig: compilation.options,
						htmlWebpackPlugin: {
							tags: assetTags,
							files: assets,
							options
						},
					}, resolveClientEnv(config.output, true));
				},
			})
		);
	});
}


function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(entry => {
			let fullPaths = entry.split(process.cwd())[1].split("/").slice(1);
			let basePaths = fullPaths.slice(0, -1);
			let filePaths = basePaths.slice(2);
			entries[filePaths.join("/")] = `./${fullPaths.join('/')}`;
		}
	);
	return entries;
}


exports.addTemplatePlugin = addTemplatePlugin;
exports.getEntry = getEntry;
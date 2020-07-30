const path = require("path");
const glob = require('glob');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


function addTemplatePlugin(type, config, router) {
	router.forEach(function (entry) {
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: `${entry.route}/index${type === "server" ? "-server" : ""}.html`,
				template: entry.template || path.join(process.cwd(), "build", "index.template.html"),
				inject: true,
				env: type,
				chunks: ['chunk-vendors', 'chunk-common', entry.route],
				minify: { //压缩HTML文件
					removeComments: false,    //移除HTML中的注释
					collapseWhitespace: true    //删除空白符与换行符
				}
			})
		)
	});
}


function getEntry(globPath) {
	let entries = {}
	glob.sync(globPath).forEach(entry => {
			let fullPaths = entry.split(process.cwd())[1].split("/").slice(1);
			let basePaths = fullPaths.slice(0, -1);
			let filePaths = basePaths.slice(2);
			entries[filePaths.join("/")] = `./${fullPaths.join('/')}`
		}
	)
	return entries;
}


exports.addTemplatePlugin = addTemplatePlugin;
exports.getEntry = getEntry;
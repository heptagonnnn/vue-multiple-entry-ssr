const glob = require('glob');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const toml = require("toml");

function getEntry(globPath) {
	let entries = {}
	glob.sync(globPath).forEach(entry => {
			let fullPaths = entry.split('/').slice(1)
			let basePaths = fullPaths.slice(0, -1);
			let filePaths = basePaths.slice(2);
			entries[filePaths.join("/")] = `./${fullPaths.join('/')}`
		}
	)
	return entries
}


function getPageRouter() {
	return glob.sync("./src/pages/**/entry-client.js").map((entry) => {
		const route = {
			route: entry.split("/").slice(3, -1).join("/"),
			originPath: entry.split("/").slice(0, -1).join("/")
		}

		// 读取配置文件
		route.config = {};
		const configPath = route.originPath + "/config.toml";
		if (fs.existsSync(configPath)) {
			Object.assign(route.config, toml.parse(fs.readFileSync(configPath)));
		}


		// 读取自定义模板
		const templatePath = route.originPath + "/index.html";
		if (fs.existsSync(templatePath)) {
			route.template = templatePath;
		}

		return route;
	});

}


function addTemplatePlugin(config, router) {
	router.forEach(function (entry) {
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: `${entry.route}/index.html`,
				template: entry.template || `${__dirname}/index.client.template.html`,
				inject: true,
				chunks: ['chunk-vendors', 'chunk-common', entry.route]
			})
		)
	});
}


exports.getEntry = getEntry;
exports.addTemplatePlugin = addTemplatePlugin;
exports.getPageRouter = getPageRouter;





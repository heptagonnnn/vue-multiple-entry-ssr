const fs = require("fs");
const glob = require("glob");
const toml = require("toml");

function getEntryRouter() {
	return glob.sync("./src/pages/**/index.js").map((entry) => {
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
	}).sort((pre, next) => {
		return next.route.length - pre.route.length;
	});
}


module.exports = getEntryRouter;
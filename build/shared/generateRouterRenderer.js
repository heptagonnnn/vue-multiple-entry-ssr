const path = require("path");
const generateTemplateRenderer = require("./generateTemplateRenderer");

function generateRouterRenderer(router, staticSourcePath, fs) {
	router.forEach((route) => {
		route.clientRenderer = generateTemplateRenderer({
			type: "client",
			fs,
			template: path.join(staticSourcePath, route.route, "index.html")
		})
		if (route.config.route === "hash") {
			route.renderer = route.clientRenderer;
		} else {
			route.renderer = generateTemplateRenderer({
				bundle: JSON.parse(fs.readFileSync(path.join(staticSourcePath, "static", "js", `${route.route}-vue-ssr-server-bundle.json`), 'utf-8')),
				type: "server",
				fs,
				template: path.join(staticSourcePath, route.route, "index-server.html"),
				options: {
					runInNewContext: false
				}
			});
		}
	});
}


module.exports = generateRouterRenderer;
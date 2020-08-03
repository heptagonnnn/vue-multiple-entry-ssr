const deleteDist = require("./shared/deleteDist");
const sideBuild = require("./webpack-config/shared/sideBuild");
const initWebpackConfig = require("./webpack-config/shared/initWebpackConfig");

const cp = require('child_process');


function buildServerEntry() {
	const cwd = process.cwd();
	const cm = `${cwd}/node_modules/.bin/ncc build build/server.js && mv ${cwd}/dist/index.js ${cwd}/dist/server.js && cp ${cwd}/build/cluster.json ${cwd}/dist`
	cp.exec(cm, function (error, stdout, stderr) {
		if (error) {
			console.error(error);
		}
		console.log("stdout:" + stdout);
	});

}


function build(env) {


	deleteDist();


	switch (env) {
		case "all":
			sideBuild(initWebpackConfig(require(`./webpack-config/webpack-server.config.js`)), "server");
			sideBuild(initWebpackConfig(require(`./webpack-config/webpack-client.config.js`)), "client");
			break;
		default:
			sideBuild(initWebpackConfig(require(`./webpack-config/webpack-${env}.config.js`)), env);
			break;
	}

	// buildServerEntry();

}

module.exports = build;
const clientBuild = require("./client-build");
const serverBuild = require("./server-build");
const getEntryRouter = require("./shared/getEntryRouter");
const deleteDist = require("./shared/deleteDist");

var cp = require('child_process');


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


function build(env, port) {


	deleteDist();

	const router = getEntryRouter();
	switch (env) {
		case "server":
			serverBuild();
			break;
		case "client":
			clientBuild(router);
			break;
		case "all":
			clientBuild(router);
			serverBuild();
	}

	buildServerEntry();

}

module.exports = build;
const clientDev = require("./client-dev");
const serverDev = require("./server-dev");
const getEntryRouter = require("./shared/getEntryRouter");
const deleteDist = require("./shared/deleteDist");

function dev(env, port) {

	deleteDist();

	const router = getEntryRouter();
	process.env.NODE_ENV = "development";
	switch (env) {
		case "server":
			serverDev(router, port);
			break;
		default:
			clientDev(router, port);
	}
}


module.exports = dev;
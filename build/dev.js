const clientDev = require("./client-dev");
const serverDev = require("./server-dev");
const deleteDist = require("./shared/deleteDist");

function dev(env, port) {

	deleteDist();

	switch (env) {
		case "server":
			serverDev(port);
			break;
		default:
			clientDev(port);
	}
}


module.exports = dev;
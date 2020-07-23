const clientDev = require("./client-dev");
const serverDev = require("./server-dev");
const {getPageRouter} = require("./webpack-util");


function dev() {
	const type = process.argv[2];

	const router = getPageRouter();
	switch (type) {
		case "server":
			serverDev(router);
			break;
		default:
			clientDev(router);
	}
}

dev();
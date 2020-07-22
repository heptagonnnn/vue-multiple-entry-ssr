const clientDev = require("./client-dev");
const serverDev = require("./server-dev");
const {getPageRouter} = require("./webpack-util");


function dev() {
	const type = process.argv[2];

	const router = getPageRouter();
	switch (type) {
		case "server":
			// todo 待client-server-plugin开发完成后再做开发
			serverDev(router);
			break;
		default:
			clientDev(router);
	}
}

dev();
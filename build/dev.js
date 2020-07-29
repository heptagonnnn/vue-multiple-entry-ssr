const clientDev = require("./client-dev");
const serverDev = require("./server-dev");
const getEntryRouter = require("./shared/getEntryRouter");


function dev() {
	const type = process.argv[2];

	const router = getEntryRouter();
	switch (type) {
		case "server":
			serverDev(router);
			break;
		default:
			clientDev(router);
	}
}

dev();
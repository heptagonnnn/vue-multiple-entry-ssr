
const clientBuild = require("./client-build");

const serverBuild = require("./server-build");

const {getPageRouter} = require("./webpack-util");

function build() {
	const type = process.argv[2];

	const router = getPageRouter();
	switch (type) {
		case "server":
			serverBuild(router);
			break;
		case "client":
			clientBuild(router);
			break;
		default:
			serverBuild(router);
			clientBuild(router);
	}
}

build();
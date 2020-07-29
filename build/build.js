const clientBuild = require("./client-build");

const serverBuild = require("./server-build");

const getEntryRouter = require("./shared/getEntryRouter");

function build() {
	const type = process.argv[2];

	const router = getEntryRouter();
	switch (type) {
		case "server":
			serverBuild();
			break;
		case "client":
			clientBuild(router);
			break;
		default:
			serverBuild();
			clientBuild(router);
	}
}

build();
#! /usr/bin/env node

const dev = require("../build/dev");
const build = require("../build/build");

const formattedArgs = require("minimist")(process.argv.slice(2), {
	boolean: [
		"client",
		"server"
	]
});


const [type] = formattedArgs._;
const {p, server, client} = formattedArgs;

const env = server ? "server" :  client ? "client" : "all";
const port = +(process.env.PORT || p || 3000);

console.log(type, env, port);

switch (type) {
	case "build":
		build(env, port);
		break;
	case "dev":
		dev(env, port);
		break;
}





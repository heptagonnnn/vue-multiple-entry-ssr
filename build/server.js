const createServer = require("./create-server");
const fs = require("fs");



process.env.RUNTIME_ENV = "server";
const router = JSON.parse(fs.readFileSync("./router.json", "utf-8"));

const app = createServer(router, process.cwd());

app.listen(process.env.ZAFT_SERVER_PORT);
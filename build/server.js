const createServer = require("./create-server");
const fs = require("fs");


const router = JSON.parse(fs.readFileSync("./router.json", "utf-8"));

const app = createServer(router, process.cwd());

app.listen(3000);
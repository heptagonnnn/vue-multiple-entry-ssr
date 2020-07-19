const clientDev = require("./client-dev");

const {getPageRouter} = require("./webpack-util");

clientDev(getPageRouter());
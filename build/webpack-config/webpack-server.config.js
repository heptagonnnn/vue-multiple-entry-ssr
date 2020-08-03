const webpack = require("webpack");

const {merge} = require("webpack-merge");
const baseConfig = require("./webpack-base.config");

const ZaftVueSSRServerPlugin = require("./plugins/zaft-vue-ssr-server-plugin");
const ZaftRouterGeneratorPlugin = require("./plugins/zaft-router-generator-plugin");


module.exports = merge(baseConfig, {
	target: 'node',
	output: {
		libraryTarget: 'commonjs2',
		filename: "static/js/[name]-server-bundle.js",
	},
	plugins: [
		new ZaftVueSSRServerPlugin(),
		new ZaftRouterGeneratorPlugin()
	]
});
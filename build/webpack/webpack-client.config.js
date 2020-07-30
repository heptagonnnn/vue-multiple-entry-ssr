const webpack = require("webpack");
const {merge} = require("webpack-merge");
const baseConfig = require("./webpack-base.config");


module.exports = merge(baseConfig, {
	output: {
		filename: "static/js/[name]-[hash].js",
		chunkFilename: 'static/js/[chunkHash].js',
	},
	optimization: {},
	plugins: [
		new webpack.DefinePlugin(
			{
				'process.env': {
					RUNTIME_ENV: '"client"',
				}
			}
		),
	]
});
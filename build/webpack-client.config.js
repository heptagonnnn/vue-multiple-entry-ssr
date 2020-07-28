const webpack = require("webpack");
const {getEntry} = require("./webpack-util");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");
module.exports = {
	mode: "production",
	entry: {
		...getEntry('./src/pages/**/index.js')
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "..", "dist"),
		filename: "static/js/[name]-[hash].js",
		chunkFilename: 'static/js/[chunkHash].js',
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.css$/,
				oneOf: [
					/* config.module.rule('css').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('css').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					}
				]
			},
			/* config.module.rule('postcss') */
			{
				test: /\.p(ost)?css$/,
				oneOf: [
					/* config.module.rule('postcss').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('postcss').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							}
						]
					}
				]
			},
			/* config.module.rule('scss') */
			{
				test: /\.scss$/,
				oneOf: [
					/* config.module.rule('scss').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('scss').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false
								}
							}
						]
					}
				]
			},
			/* config.module.rule('sass') */
			{
				test: /\.sass$/,
				oneOf: [
					/* config.module.rule('sass').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false,
									sassOptions: {
										indentedSyntax: true
									}
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false,
									sassOptions: {
										indentedSyntax: true
									}
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false,
									sassOptions: {
										indentedSyntax: true
									}
								}
							}
						]
					},
					/* config.module.rule('sass').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: false,
									sassOptions: {
										indentedSyntax: true
									}
								}
							}
						]
					}
				]
			},
			/* config.module.rule('less') */
			{
				test: /\.less$/,
				oneOf: [
					/* config.module.rule('less').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'less-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'less-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'less-loader',
								options: {
									sourceMap: false
								}
							}
						]
					},
					/* config.module.rule('less').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'less-loader',
								options: {
									sourceMap: false
								}
							}
						]
					}
				]
			},
			/* config.module.rule('stylus') */
			{
				test: /\.styl(us)?$/,
				oneOf: [
					/* config.module.rule('stylus').oneOf('vue-modules') */
					{
						resourceQuery: /module/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: false,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('vue') */
					{
						resourceQuery: /\?vue/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: false,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('normal-modules') */
					{
						test: /\.module\.\w+$/,
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3,
									modules: true,
									localIdentName: '[name]_[local]_[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: false,
									preferPathResolver: 'webpack'
								}
							}
						]
					},
					/* config.module.rule('stylus').oneOf('normal') */
					{
						use: [
							{
								loader: 'vue-style-loader',
								options: {
									sourceMap: false,
									shadowMode: false
								}
							},
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 3
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									plugins: [
										function () { /* omitted long function */
										}
									]
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									sourceMap: false,
									preferPathResolver: 'webpack'
								}
							}
						]
					}
				]
			},
		]
	},
	optimization: {},
	plugins: [
		// 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
		// 以便可以在之后正确注入异步 chunk。
		// 这也为你的 应用程序/vendor 代码提供了更好的缓存。
		// 此插件在输出目录中
		// 生成 `vue-ssr-client-manifest.json`。
		// new VueSSRClientPlugin(),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin(
			{
				'process.env': {
					RUNTIME_ENV: '"client"',
				}
			}
		),
	]
}
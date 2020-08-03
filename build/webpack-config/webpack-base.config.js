const {getEntry} = require("./shared");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const glob = require("glob");
const resolveClientEnv = require("../shared/resolveClientEnv");
const config = {
	mode: process.env.NODE_ENV || "production",
	entry: {
		...getEntry(process.cwd() + '/src/pages/**/index.js')
	},
	resolve: {
		alias: {
			'@': path.join(process.cwd(), "src"),
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: [
			'.mjs',
			'.js',
			'.jsx',
			'.vue',
			'.json',
			'.wasm'
		]
	},
	resolveLoader: {
		modules: [
			path.join(process.cwd(), "node_modules", "@bilibili-bbq", "zaft", "node_modules"),
			'node_modules',
			path.join(process.cwd(), "node_modules")
		]
	},
	devtool: 'source-map',
	output: {
		path: path.join(process.cwd(), "dist"),
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			/* config.module.rule('images') */
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1500,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'static/img/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('svg') */
			{
				test: /\.(svg)(\?.*)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'static/img/[name].[hash:8].[ext]'
						}
					}
				]
			},
			/* config.module.rule('media') */
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'static/media/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('fonts') */
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'static/fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			},
			/* config.module.rule('css') */
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
		new VueLoaderPlugin()
	]
};



/* config.plugin('copy') */
const publicPath = path.join(process.cwd(), "public", "**", "*");
if (glob.sync(publicPath).length > 0) {
	config.plugins.push(new CopyWebpackPlugin({
		patterns:
			[
				{
					from: path.join(process.cwd(), "public"),
					to: path.join(process.cwd(), "dist"),
					toType: 'dir',
					globOptions: {
						ignore: [
							'.DS_Store',
							'**/index.html',
						]
					},

				}
			]
	}))
}


module.exports = config;
const {getEntry} = require("./shared");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");
module.exports = {
	mode: "production",
	entry: {
		...getEntry(process.cwd() + '/src/pages/**/index.js')
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
}
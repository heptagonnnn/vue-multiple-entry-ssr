const path = require("path");
const webpack = require("webpack");
const {getEntry} = require("./webpack-util");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BBQVueSSRServerPlugin = require("./bbq-vue-ssr-server-plugin");
const RouterCreatorPlugin = require("./router-creator-plugin");
module.exports = {
	mode: "production",
	// 将 entry 指向应用程序的 server entry 文件
	entry: {
		...getEntry('./src/pages/**/index.js')
	},
	// 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
	// 并且还会在编译 Vue 组件时，
	// 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
	target: 'node',

	// 对 bundle renderer 提供 source map 支持
	devtool: 'source-map',

	// 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, "..", 'dist'),
		filename: "static/js/[name]-server-bundle.js",
	},
	module: {
		rules: [
			// ... 忽略其它规则

			// 普通的 `.scss` 文件和 `*.vue` 文件中的
			// `<style lang="scss">` 块都应用它
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
	// 这是将服务器的整个输出
	// 构建为单个 JSON 文件的插件。
	// 默认文件名为 `vue-ssr-server-bundle.json`
	plugins: [
		new VueLoaderPlugin(),
		new BBQVueSSRServerPlugin(),
		new webpack.DefinePlugin(
			{
				'process.env': {
					RUNTIME_ENV: '"server"',
				}
			}
		),
		new RouterCreatorPlugin()
	]
}
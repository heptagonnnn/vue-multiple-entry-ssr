const pluginName = 'BBQVueSSRServerPlugin';


var isJS = function (file) {
	return /\.js(\?[^.]+)?$/.test(file);
};

var prefix = "[zaft-vue-server-renderer-webpack-plugin]";
var warn = exports.warn = function (msg) {
	return console.error((prefix + " " + msg + "\n"));
};


class BBQVueSSRServerPlugin {

	apply(compiler) {
		compiler.hooks.emit.tapAsync(pluginName, function (compilation, cb) {
			const stats = compilation.getStats().toJson();

			try {
				Object.entries(stats.entrypoints).forEach(([entry, info]) => {
					const entryAssets = info.assets.filter(isJS);
					const entryId = info.chunks[0]
					const bundle = {
						entry: entryAssets[0],
						files: {},
						maps: {}
					}
					stats.chunks.forEach(function (chunk) {
						if (~chunk.parents.indexOf(entryId) || chunk.id === entryId) {
							chunk.files.forEach((filename) => {
								if (isJS(filename)) {
									bundle.files[filename] = compilation.assets[filename].source();
								} else if (filename.match(/\.js\.map$/)) {
									bundle.maps[filename.replace(/\.map$/, '')] = JSON.parse(compilation.assets[filename].source());
								}
								// do not emit anything else for server
								delete compilation.assets[filename];
							});
						}
					});

					var json = JSON.stringify(bundle, null, 2);
					var filename = `static/js/${entry}-vue-ssr-server-bundle.json`;

					compilation.assets[filename] = {
						source: function () {
							return json;
						},
						size: function () {
							return json.length;
						}
					};
				});
			} catch (Err) {
				warn(Err);
			}
			cb();

		});
		// compiler.plugin("emit", function (compilation, callback) {
		//
		// 	const stats = compilation.getStats().toJson();
		//
		// 	compilation.assets["filelist.json"] = {
		// 		source() {
		// 			return JSON.stringify(stats)
		// 		},
		// 		size() {
		// 			return filelist.length;
		// 		}
		// 	};
		//
		// 	callback();
		// });
		//
		// compiler.plugin("done", function () {
		// 	console.log("plugin use done");
		// })
	}
}

module.exports = BBQVueSSRServerPlugin;
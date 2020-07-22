const pluginName = 'BBQVueSSRServerPlugin';


var isJS = function (file) {
	return /\.js(\?[^.]+)?$/.test(file);
};

class BBQVueSSRServerPlugin {

	apply(compiler) {
		compiler.hooks.emit.tapAsync("vue-server-plugin", function (compilation, cb) {
			const stats = compilation.getStats().toJson();
			const entrypoints = Object.keys(stats.entrypoints);


			entrypoints.forEach((entry) => {
				const entryAssets = stats.entrypoints[entry].assets.filter(isJS);
				const bundle = {
					entry: entryAssets[0],
					files: {},
					maps: {}
				}
				stats.chunks.forEach(function (chunk) {
					if (~chunk.parents.indexOf(entry) || chunk.names[0] === entry) {
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
				var filename = `${entry}-vue-ssr-server-bundle.json`;

				compilation.assets[filename] = {
					source: function () {
						return json;
					},
					size: function () {
						return json.length;
					}
				};
			});
			cb();

		});
		compiler.plugin("emit", function (compilation, callback) {

			const stats = compilation.getStats().toJson();

			compilation.assets["filelist.json"] = {
				source() {
					return JSON.stringify(stats)
				},
				size() {
					return filelist.length;
				}
			};

			callback();
		});

		compiler.plugin("done", function () {
			console.log("plugin use done");
		})
	}
}

module.exports = BBQVueSSRServerPlugin;
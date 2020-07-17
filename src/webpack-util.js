const glob = require('glob');
const path = require("path");
function getEntry(globPath) {
	let entries = {}
	glob.sync(globPath).forEach(entry => {
			let filename = path.basename(entry, path.extname(entry))
			let fullPaths = entry.split('/').slice(1)
			let basePaths = fullPaths.slice(0, -1);
			let filePaths = basePaths.slice(2);
			// if (fullPaths.indexOf('promote') === -1) {
			// entries[filePaths.join('-')] = {
			// 	entry: fullPaths.join('/'),
			// 	template: basePaths.join('/') + '/' + filename + '.html',
			// 	filename: filePaths.join('/') + '/' + filename + '.html'
			// }
			entries[filePaths.join("/")] = `./${fullPaths.join('/')}`
			// }
		}
	)
	return entries
}

module.exports = getEntry

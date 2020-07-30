const fs = require("fs");
const path = require("path");

function deleteDist() {
	const distPath = path.join(process.cwd(), "dist");
	if (!fs.existsSync(distPath)) {
		return;
	}

	fs.rmdirSync(distPath, {
		recursive: true
	});
}




module.exports = deleteDist;
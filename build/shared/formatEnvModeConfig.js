const toml = require("toml");
const fs = require("fs");
const path = require("path");


function formatEnvModeConfig(mode) {
	const configPath = path.join(process.cwd(), `.env.${mode}.toml`)
	if (fs.existsSync(configPath)) {
		const config = toml.parse(fs.readFileSync(configPath));
		Object.entries(config).forEach(([key, value]) => {
			process.env[key] = value;
		})
	}
}


module.exports = formatEnvModeConfig


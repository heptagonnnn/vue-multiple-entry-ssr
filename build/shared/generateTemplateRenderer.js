const {createBundleRenderer} = require("vue-server-renderer");


function generateTemplateRenderer(
	{
		fs,
		template,
		bundle,
		type,
		...options
	}
) {
	if (type === "client") {
		return {
			renderToString(context) {
				return new Promise((resolve, reject) => {
					const data = fs.readFileSync(template, 'utf-8');
					resolve(data);
				})
			}
		}
	} else {
		return createBundleRenderer(bundle, {
			...options,
			template: fs.readFileSync(template, 'utf-8')
		});
	}
}


module.exports = generateTemplateRenderer;
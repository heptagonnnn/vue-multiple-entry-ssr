import {createApp} from "./createApp";

export default function resolveEntry(config) {
	const env = process.env.RUNTIME_ENV;
	const {index, router} = config;

	if (env === "server") {
		return context => {
			return new Promise(async (resolve, reject) => {
				const {app} = await createApp(index, {router});
				resolve(app);
			})
		}
	} else {
		return createApp(index, {router}).then(({app}) => {
			app.$mount('#app')
		})

	}
}
import {createApp} from "./createApp";

export default function resolveEntry(config) {
	const env = process.env.RUNTIME_ENV;
	const {index, router} = config;

	if (env === "server") {
		return context => {
			return new Promise(async (resolve, reject) => {
				const {app, router, prefetchData} = await createApp(index, {router, ...context});
				context.state = prefetchData;

				if (router) {
					const afterBase = context.url.split(context.baseRoute)[1];
					router.push(afterBase);
					router.onReady(() => {
						resolve(app);
					});
				} else {
					resolve(app);
				}
			})
		}
	} else {
		return createApp(index, {router}).then(({app}) => {
			app.$mount('#app')
		})

	}
}
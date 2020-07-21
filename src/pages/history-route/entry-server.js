import {createApp} from "../../../build/createApp";
import index from "./index.vue";
import _router from "./router";

export default context => {
	return new Promise(async (resolve, reject) => {
		const {app, router} = await createApp(index, {router: _router});
		const afterBase = context.url.split(context.baseRoute)[1];
		router.push(afterBase)
		router.onReady(() => {
			resolve(app);
		});
	})

}
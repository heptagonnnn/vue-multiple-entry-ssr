import {createApp} from "../../../build/createApp";
import index from "./index.vue";
import _router from "./router";

console.log(123123);
export default context => {
	return new Promise(async (resolve, reject) => {
		const {app, router} = await createApp(index, {router: _router});
		router.push(context.url);
		console.log("context", context.url);
		console.log("router111", router);

		console.log("matched", router.getMatchedComponents());
		router.onReady(() => {
			resolve(app);
		});
	})

}
import {createApp} from "../../../build/createApp";
import index from "./index.vue";
export default context => {
	return new Promise(async (resolve, reject) => {
		const {app, router} = await createApp(index);
		resolve(app);
	})
}
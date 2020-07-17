import {createApp} from "../../createApp";
import index from "./index.vue";
export default context => {

	return new Promise(async (resolve, reject) => {
		const {app} = await createApp(index);
		resolve(app);
	})

}
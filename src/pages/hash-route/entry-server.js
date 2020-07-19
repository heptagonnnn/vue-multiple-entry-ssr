import {createApp} from "../../../build/createApp";
import router from "./router";

export default context => {
	return new Promise(async (resolve, reject) => {
		const {app} = await createApp(index, {router});
		resolve(app);
	})
}
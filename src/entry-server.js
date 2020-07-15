import {createApp} from './app'

export default context => {

	return new Promise(async (resolve, reject) => {
		const {app} = await createApp();
		resolve(app);
	})

}
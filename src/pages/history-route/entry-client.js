import {createApp} from "../../../build/createApp";
import index from "./index.vue";
import router from "./router";

createApp(index, {router}).then(({app, router}) => {
	router.onReady(() => {
		app.$mount('#app');
	})
});
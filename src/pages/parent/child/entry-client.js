import {createApp} from "../../../createApp";
import index from "./index.vue";


createApp(index).then(({app}) => {
	app.$mount('#app')
})

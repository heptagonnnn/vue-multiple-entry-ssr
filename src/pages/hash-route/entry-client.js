import {createApp} from "../../../build/createApp";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import index from "./index.vue";
import router from "./router";
console.log(router);
createApp(index, {router}).then(({app}) => {
	app.$mount('#app')
})

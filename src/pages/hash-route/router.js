import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [{
		path: "*",
		redirect: "/"
	}, {
		path: "/",
		name: "child1",
		// component: child1
		component: () => import("./child1.vue")
	}, {
		path: "/child2",
		name: "child2",
		component: () => import("./child2.vue")
	}]
});
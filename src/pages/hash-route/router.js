import Router from "vue-router";
// import child1 from "./child1.vue";
// import child2 from "./child2.vue";

export default new Router({
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
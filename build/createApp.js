import Vue from 'vue'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export async function createApp(App, options = {}) {

	// 初始化数据
	let data = {};
	if (App.initPage) {
		data = await App.initPage();
	}
	const _data = App.data || function () {
		return {};
	};
	App.data = function () {
		return {...data, ..._data()};
	}

	console.log(options);
	const ctrc = {
		render: h => h(App),
		router: options.router ? options.router : undefined
	}

	const app = new Vue(ctrc);

	console.log(ctrc);
	return {app, ...ctrc};
}
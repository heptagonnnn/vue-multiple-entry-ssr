import Vue from 'vue'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export async function createApp(App) {

	let data = {};
	if (App.initPage) {
		data = await App.initPage();
	}


	const _data = App.data;

	App.data = function () {
		return {...data, ..._data()};
	}

	const app = new Vue({
		render: h => h(App)
	})
	return {app}
}
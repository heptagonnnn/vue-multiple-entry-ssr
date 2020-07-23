import Vue from 'vue'
import axios from "axios";
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export async function createApp(App, options = {}) {

	const {cookieRaw} = options;

	// 数据预载
	let data = {};

	if (process.env.RUNTIME_ENV === "server") {

		const axios_instance = axios.create({
			baseURL: "http://localhost:8080/node-api/",
			headers: {
				Cookie: cookieRaw
			}
		});
		if (App.initPage) {
			data = await App.initPage(axios_instance);
		}

	} else {
		const prefetchData = window.__INITIAL_STATE__;
		if (prefetchData) {
			data = prefetchData;
		} else if (App.initPage) {
			data = await App.initPage(axios);
		}
	}
	const _data = App.data || function () {
		return {};
	};


	App.data = function () {
		return {...data, ..._data()};
	}


	const ctrc = {
		render: h => h(App),
		router: options.router ? options.router : undefined
	}

	const app = new Vue(ctrc);

	return {app, ...ctrc, prefetchData: data};
}
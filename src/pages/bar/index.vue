<template>
	<div class="tttt app">
		<div @click="test">
			Bar
		</div>
		<div>
			a: {{a}}aaaa
			initPage: {{init}}
		</div>
	</div>
</template>


<script>

	export default {
		initPage(axios) {
			return axios.get("/bar").then(res => {
				return {init: 1}
			});
		},
		created() {
			console.log(this.init);
		},
		data() {
			return {
				a: 2
			}
		},
		methods: {
			test() {
				console.log("success");
			}
		}
	}

</script>


<style lang="scss" scoped>
	.tttt {
		color: red;
	}
</style>
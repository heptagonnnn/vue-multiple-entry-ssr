<template>
	<div class="tttt">
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
		initPage() {
			return Promise.resolve({
				init: 1
			})
		},
		data() {
			return {
				a: 1
			}
		},
		methods: {
			test() {
				console.log("success");
			}
		}
	}
</script>
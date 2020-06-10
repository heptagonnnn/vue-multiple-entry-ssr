<template>
	<div>
		foo
	</div>
</template>

<script>
	export default {
		beforeCreate() {
			console.log("before Create");
		},
		created() {
			console.log("created");
		},
		beforeMount() {
			console.log("before mount");
		},
		mounted() {
			console.log("mounted");
			console.log(this)
		}
	}
</script>
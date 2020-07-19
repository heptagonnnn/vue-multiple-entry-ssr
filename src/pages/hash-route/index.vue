<template>
	<div>
		<router-link to="/">child1</router-link>
		<router-link to="/child2">child2</router-link>
		<router-view></router-view>
	</div>
</template>


<script>
	export default {
		created() {
			console.log(this);
		}
	}
</script>
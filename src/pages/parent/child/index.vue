<template>
	<div>
		<div>
			childddd
		</div>
		<div>
			a: {{a}}
			initPage: {{init}}
		</div>
	</div>
</template>


<script>
	export default {
		initPage() {
			return Promise.resolve({
				init    : 3
			})
		},
		data() {
			return {
				a: 3
			}
		}
	}
</script>
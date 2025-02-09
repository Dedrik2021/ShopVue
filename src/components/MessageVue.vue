<template>
	<div class="container-sm py-1" :class="`alert alert-${type}`" role="alert">
		{{ message }}
	</div>
</template>

<script>
export default {
	name: 'MessageVue',
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.container-sm {
	max-width: 1000px;
	margin: 0 auto;
	margin-top: 20px;
	text-align: center;
}
</style>

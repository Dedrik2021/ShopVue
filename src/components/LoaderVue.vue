<template>
	<div class="spinner">
		<div class="spinner-border" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	</div>
</template>


<script>
export default {
    name: 'LoaderVue',
};    
</script>

<style scoped>
.spinner {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh;
}
</style>
<template>
	<div class="not-found">
		<h1>404 - Page Not Found</h1>
		<p>The page you are looking for does not exist.</p>
		<router-link to="/" class="btn btn-primary">Go Back Home</router-link>
	</div>
</template>

<script>
export default {
	name: 'NotFoundPage',
};
</script>

<style scoped>
.not-found {
	text-align: center;
	margin-top: 50px;
}
</style>

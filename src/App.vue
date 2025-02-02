<template>
	<div id="app">
		<header-component />
		<main class="container py-3 main">
			<router-view />
		</main>
		<footer-component />
	</div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
	name: 'App',
	components: {
		HeaderComponent,
		FooterComponent,
	},
};
</script>

<style scoped>
.main {
	min-height: 80vh;
}

html {
	box-sizing: border-box;
}

*,
*::after,
*::before {
	box-sizing: inherit;
}

a {
	text-decoration: none;
	color: inherit;
}

ul,
ol {
	padding: 0;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
figure,
figcaption,
blockquote,
dl,
dd {
	margin: 0;
}

ul {
	list-style: none ;
}

img {
	max-width: 100%;
}

input,
button,
textarea,
select {
	font: inherit;
}

button {
	cursor: pointer;
}

address {
	font-style: normal;
}
</style>

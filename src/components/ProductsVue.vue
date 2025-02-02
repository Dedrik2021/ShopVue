<template>
	<ul class="list list-unstyled row d-flex justify-content-center ">
		<li
			class="list-item col-sm-12 col-md-6 col-lg-4 col-xl-2 my-2 mx-2 p-2 border rounded shadow-sm"
			v-for="product in products"
			:key="product._id"
		>
			<router-link class="text-decoration-none hover" vue-transition :to="`/product/${product._id}`">
				<img class="img-fluid object-fit-cover" width="300" height="250" :src="product.image" alt="" />
				<p class="mx-2 my-2 text-truncate-2">{{ product.name }}</p>
			</router-link>
			<div class="mx-2">
				<rating-vue :value="product.rating" :text="`${product.numReviews} reviews`" :color="`#f8e825`" />
				<strong>${{ product.price }}</strong>
			</div>
		</li>
	</ul>
</template>

<script>
import RatingVue from './RatingVue.vue';
export default {
	name: 'ProductsVue',

	components: {
		RatingVue,
	},

	props: {
		products: {
			type: Array,
			required: true,
		},
	},
};
</script>


<style scoped>
.list {
	width: 100%;
	margin-bottom: 50px;
}

.list-item {
	min-width: 300px;
	background-color: #f8f9fa;
}
</style>
<template>
	<div>
		<router-link to="/" class="btn btn-light my-3">Go Back</router-link>
		<loader-vue v-if="status === 'pending'" />
		<message-vue v-if="error" :message="error" :type="'danger'" />
		<div v-else class="d-flex">
			<div class="w-100">
				<img :src="product.image" width="600" class="img-fluid" height="450" alt="" />
			</div>
			<div class="w-100 mx-3">
				<div class="list-group">
					<div class="list-group-item">
						<h3>{{ product.name }}</h3>
					</div>
					<div class="list-group-item">
						<rating-vue
							:value="product.rating"
							:text="`${product.numReviews} reviews`"
							:color="`#f8e825`"
						/>
					</div>
					<div class="list-group-item"><strong> Price:</strong> ${{ product.price }}</div>
					<div class="list-group-item">
						<strong> Description:</strong> {{ product.description }}
					</div>
				</div>
			</div>
			<div class="md-3 w-50">
				<div class="list-group" variant="flush">
					<div class="list-group-item">
						<div class="row">
							<div class="col">Price:</div>
							<div class="col">
								<strong>${{ product.price }}</strong>
							</div>
						</div>
					</div>
					<div class="list-group-item">
						<div class="row">
							<div class="col">Status:</div>
							<div class="col">
								<strong>{{
									product.countInStock > 0 ? 'In Stock' : 'Out of Stock'
								}}</strong>
							</div>
						</div>
					</div>
					<div v-if="product.countInStock > 0" class="list-group-item">
						<div class="d-flex align-items-center">
							<div class="col">Qty:</div>
							<div class="col">
								<select
									v-model="qty"
									class="form-select"
									@change="changeQtyHandler"
								>
									<option v-for="i in product.countInStock" :key="i" :value="i">
										{{ i }}
									</option>
								</select>
							</div>
						</div>
					</div>
					<div class="list-group-item" v-if="product.countInStock">
						<b-button @click="addToCartHandler" :disabled="!product.countInStock" class="w-100" type="button">Add to Cart</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RatingVue from '../components/RatingVue.vue';
import LoaderVue from '../components/LoaderVue.vue';
import MessageVue from '../components/MessageVue.vue';

export default {
	components: {
		RatingVue,
		LoaderVue,
		MessageVue,
	},
	name: 'SingleProductPage',

	data() {
		return {
			qty: 1,
		};
	},

	computed: {
		...mapGetters(['productById', 'user']),
		product() {
			return this.productById;
		},
		status() {
			return this.$store.state.status;
		},

		error() {
			return this.$store.state.error;
		},
	},
	methods: {
		...mapActions(['fetchProductById', 'addItemToCart']),

		changeQtyHandler(e) {
			this.qty = e.target.value;
		},

		async addToCartHandler() {
			const cartItems = JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [];
			await this.addItemToCart({ id: this.$route.params.id, qty: this.qty, username: this.user.username, cartItems });
			await this.$router.push(`/cart/${this.$route.params.id}?qty=${this.qty}`)
		},
	},
	mounted() {
		this.fetchProductById(this.$route.params.id);
	},
};
</script>

<style></style>

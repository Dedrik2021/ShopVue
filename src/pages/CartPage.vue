<template>
	<div>
		<div class="cart-page position-relative z-index-0">
			<h2 class="mb-4">Shopping Cart</h2>
			<message-vue v-if="infoMessage" :message="infoMessage" :type="'success'" />
			<div v-if="filteredCartItems.length === 0">
				<p>Your cart is empty.</p>
				<router-link to="/" class="btn btn-primary">Go Back</router-link>
			</div>
			<div v-else>
				<ul class="list-group mb-4 shadow">
					<li class="list-group-item" v-for="item in filteredCartItems" :key="item.product">
						<div class="row">
							<div class="col-md-4">
								<img
									:src="item.image"
									height="150"
									width="150"
									alt="Product Image"
									class="img-fluid"
								/>
							</div>
							<div class="col-md-4">
								<router-link :to="`/product/${item._id}`">{{
									item.name
								}}</router-link>
							</div>
							<div class="col-md-2">
								<p>${{ item.price }}</p>
							</div>
							<div class="col-md-2">
								<input
									type="number"
									class="form-control"
									v-model.number="item.qty"
									@change="(e) => updateQtyItem(e, item._id)"
									min="1"
									:max="item.countInStock"
								/>
								<div class="col-md-2 mt-2">
									<button
										class="btn btn-danger py-1"
										@click="removeItem(item._id)"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="cart-summary">
					<h3 class="">Subtotal: ({{ subtotal }}) items</h3>
					<h3>Total: ${{ total }}</h3>
					<button @click="checkoutHandler" type="button" class="btn btn-success">
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>

		<div v-if="showModal">
			<div class="layout"></div>
			<div class="cart-modal">
				<div class="cart-modal-content">
					<h2>Please Confirm</h2>
					<p>Are you sure you want to delete "{{ infoDeleteItem }}"?</p>
					<button class="btn btn-danger mx-3 py-1 px-4" @click="handleOk">YES</button>
					<button class="btn btn-primary py-1 px-4" @click="handleCancel">NO</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

import MessageVue from '@/components/MessageVue.vue';

export default {
	components: {
		MessageVue,
	},
	name: 'CartPage',

	data() {
		return {
			deleteItem: null,
			infoDeleteItem: '',
			showModal: false,
		};
	},

	computed: {
		...mapGetters(['cartItems', 'infoMessage', 'user']),

		filteredCartItems() {
			return this.cartItems.filter((item) => item?.username === this.user?.username);
		},

		total() {
			return Math.round(this.filteredCartItems.reduce((acc, item) => acc + item.qty * item.price, 0));
		},

		subtotal() {
			return this.filteredCartItems.reduce((acc, item) => acc + item.qty, 0);
		},
	},
	methods: {
		...mapActions(['removeItemFromCart', 'clearInfoMessage']),
		...mapMutations(['updateQtyItemInCart', 'setError', 'setCartItems']),

		updateQtyItem(e, id) {
			this.updateQtyItemInCart({ id: id, qty: e.target.value });
		},

		checkoutHandler() {
			this.$router.push('/login?redirect=shipping');
		},

		removeItem(id) {
			this.showModal = true;
			this.deleteItem = id;
			const info = this.filteredCartItems.find((item) => item._id === id);
			this.infoDeleteItem = info.name;
		},

		handleCancel() {
			this.showModal = false;
			this.deleteItem = null;
			this.infoDeleteItem = '';
		},

		async handleOk() {
			await this.removeItemFromCart(this.deleteItem);
			await this.handleCancel();
		},

		loadCartItems() {
			const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
			const cart = cartItemsStorage.filter((item) => item?.username === this.user?.username);
			this.setCartItems(cart);
		},
	},

	mounted() {
		this.loadCartItems();
	},

	watch: {
		user(newUser) {
			if (newUser) {
				this.loadCartItems();
			}
		},
		cartItems() {
			this.filteredCartItems.reverse();
		},
		infoMessage(newMessage) {
			if (newMessage) {
				setTimeout(() => {
					this.clearInfoMessage();
				}, 3000);
			}
		},
	},
};
</script>

<style scoped>
.cart-page {
	max-width: 800px;
	margin: 50px auto;
}
.cart-summary {
	margin-top: 20px;
	text-align: right;
}

.cart-modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600px;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	z-index: 1;
}

.layout {
	content: '';
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.cart-modal-content {
	text-align: center;
}
</style>

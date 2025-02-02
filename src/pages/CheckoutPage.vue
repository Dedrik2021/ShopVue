<template>
	<div class="checkout-page">
		<h2>Checkout</h2>
		<form @submit.prevent="handleCheckout">
			<div class="form-group">
				<label for="name">Name</label>
				<input type="text" class="form-control" id="name" v-model="name" required />
			</div>
			<div class="form-group">
				<label for="address">Address</label>
				<input type="text" class="form-control" id="address" v-model="address" required />
			</div>
			<div class="form-group">
				<label for="city">City</label>
				<input type="text" class="form-control" id="city" v-model="city" required />
			</div>
			<div class="form-group">
				<label for="postalCode">Postal Code</label>
				<input
					type="text"
					class="form-control"
					id="postalCode"
					v-model="postalCode"
					required
				/>
			</div>
			<div class="form-group">
				<label for="country">Country</label>
				<input type="text" class="form-control" id="country" v-model="country" required />
			</div>
			<button type="submit" class="btn btn-primary">Place Order</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'CheckoutPage',
	data() {
		return {
			name: '',
			address: '',
			city: '',
			postalCode: '',
			country: '',
		};
	},
	methods: {
		handleCheckout() {
			// Handle checkout logic here
			console.log('Checkout details:', {
				name: this.name,
				address: this.address,
				city: this.city,
				postalCode: this.postalCode,
				country: this.country,
			});
			// Redirect to a confirmation page or perform further actions
		},
	},
};
</script>

<style scoped>
.checkout-page {
	max-width: 600px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

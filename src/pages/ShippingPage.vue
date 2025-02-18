<template>
	<div class="checkout-page shadow">
		<checkout-steps step1 step2 />
		<h2>Shipping</h2>
		<form @submit.prevent="handleShipping" class="">
			
			<input-form label="Name" name="name" v-model="name" />

			<input-form label="Address" name="address" v-model="address" />

			<input-form label="City" name="city" v-model="city" />
			
			<input-form label="Postal Code" name="postalCode" v-model="postalCode" />
			
			<input-form marginBottom="30px" label="Country" name="country" v-model="country" />
			<b-button :disabled="!ifAllFieldsFilled() || status === 'pending'" type="submit">Continue</b-button>
		</form>
	</div>
</template>

<script>
	import { mapMutations, mapGetters, mapActions } from 'vuex';

	import InputForm from '@/components/InputForm.vue';
	import CheckoutSteps from '@/components/CheckoutSteps.vue';

export default {
	name: 'CheckoutPage',

	components: {
		InputForm,
		CheckoutSteps
	},
	data() {
		return {
			name: '',
			address: '',
			city: '',
			postalCode: '',
			country: '',
			username: '',
		};
	},

	computed: {
		...mapGetters(['user', 'cart']),

		status() {
			return this.$store.state.status
		}
	},

	methods: {
		...mapMutations([ 'setCart']),
		...mapActions(['saveShippingAddress']),

		handleShipping() {
			const address = {
				name: this.name,
				address: this.address,
				city: this.city,
				postalCode: this.postalCode,
				country: this.country,
				username: this.user.username
			}

			this.saveShippingAddress(address)

			this.$router.push('/payment');
		},

		ifAllFieldsFilled() {
			if (this.name === '' || this.address === '' || this.city === '' || this.postalCode === '' || this.country === '') {
				return false
			} 

			return true
		},

	},
	
	mounted() {
		if (!this.user || !this.user.name) {
			this.$router.push('/login');
		}

		this.ifAllFieldsFilled();	
		this.setCart();

		console.log(this.status);
		
		
		const { shippingAddress } = this.cart

		if (shippingAddress) {
			this.name = shippingAddress.name;
			this.address = shippingAddress.address;
			this.city = shippingAddress.city;
			this.postalCode = shippingAddress.postalCode;
			this.country = shippingAddress.country;
			this.username = shippingAddress.username;
		}
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

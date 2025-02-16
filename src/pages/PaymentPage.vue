<template>
    <div class="payment-page shadow">
		<checkout-steps step1 step2 step3 />
		<h2 class="mb-4">Select Method</h2>
		<form @submit.prevent="submitHandler" class="">
			
            <b-form-radio class="mb-4 cursor-pointer" v-model="paymentMethod" name="paymentMethod" value="PayPal">PayPal or Credit Card</b-form-radio>
			
			<b-button type="submit">Continue</b-button>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import CheckoutSteps from '@/components/CheckoutSteps.vue';

export default {
    name: 'PaymentPage',

    components: {
        CheckoutSteps
    },

    data() {
        return {
            paymentMethod: 'PayPal'
        }
    },

    computed: {
        ...mapGetters(['cart']),
    },

    methods: {
        ...mapMutations(['savePaymentMethod', 'setCart']),

        async submitHandler() {
            await this.savePaymentMethod(this.paymentMethod);
            await this.setCart()
            this.$router.push('/place-order');
        },

    },

    mounted() {
        const { shippingAddress } = this.cart
        if (!shippingAddress.address) {
            this.$router.push('/shipping');
        }
    }
}
</script>

<style scoped>
.payment-page {
	max-width: 600px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>